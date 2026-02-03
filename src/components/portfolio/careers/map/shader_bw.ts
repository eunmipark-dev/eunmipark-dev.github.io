// shader.ts
// shader_bw.ts

export const _VS_building = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vLocalPos;
  varying vec3 vLocalNormal;
  varying vec2 vUv;
  uniform float uScale;

  void main() {
    vUv = uv;
    vLocalPos = position;
    vLocalNormal = normal;
    vNormal = normalize(normalMatrix * normal);

    // 정점 위치에 uScale을 곱해 건물 크기 조절
    vec3 scaledPosition = position * uScale;

    vec4 mvPosition = modelViewMatrix * vec4(scaledPosition, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`
// shader_bw.ts

export const _FS_building = `
  uniform vec3 uColor; // 흰색 (#ffffff)
  uniform float uTime;
  uniform float uIsActive; // 0.0: 평상시, 1.0: 선택됨
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vLocalNormal;
  varying vec3 vLocalPos;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // 1. [핵심] 가상 광원 설정 ( Lambert Shading )
    // 오른쪽 위에서 대각선으로 비치는 화이트 조명을 시뮬레이션합니다.
    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
    float Lambert = max(dot(normal, lightDir), 0.0);
    
    // 2. 명암 대비 조절 (그림자 깊이)
    // 그림자 부분도 너무 까맣지 않게 Ambient(0.2)를 섞어줍니다.
    float diffuse = Lambert * 0.8 + 0.2;
    
    // 3. 아웃라인 효과 (기존 로직 유지)
    float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
    bool isTop = vLocalNormal.y > 0.5;
    float lidEdge = smoothstep(1.7, 2.0, length(vLocalPos.xz));
    float outline = isTop ? lidEdge : fresnel;
    
    // 4. [수정] 기본 상태: 명암이 반영된 흰색 반투명
    // diffuse 값을 곱해주어 각 면의 밝기가 다르게 보이게 합니다.
    vec3 baseColor = uColor * diffuse; 
    float baseAlpha = 0.5;
    
    // 5. 활성화 시 효과
    float scanline = sin(vUv.y * 50.0 - uTime * 5.0) * 0.5 + 0.5;
    vec3 activeGlow = uColor * outline * 2.0;
    
    vec3 finalColor = baseColor;
    float finalAlpha = baseAlpha;

    if(uIsActive > 0.1) {
        // 활성화 시 전체적으로 밝아지며 하이라이트 추가
        finalColor = mix(baseColor, uColor, 0.6) + activeGlow + (uColor * scanline * 0.15);
        finalAlpha = mix(baseAlpha, 0.9, uIsActive * (outline * 0.4 + 0.3));
        finalAlpha = finalAlpha + 0.2;
    }

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`
// --- 헥사곤 그리드 셰이더 ---
export const _VS_scale = `
  uniform float uScale;
  varying vec3 vInstPos; // 실제 렌더링되는(확장된) 위치
  varying vec2 vUv;
  uniform vec3 uCenter;

  void main() {
    vUv = uv;

    // 1. 인스턴스의 원래 로컬 중심 위치
    vec3 originCenter = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
    mat3 rotMat = mat3(instanceMatrix);

    // 2. 실제 화면에 그려질 확장된 위치 계산
    vec3 scaledCenter = (originCenter) * uScale - uCenter;
    vec3 scaledPos = (rotMat * position) * uScale;
    
    // 3. Fragment Shader로 '실제 렌더링 위치' 전달
    vInstPos = scaledCenter; 
    
    gl_Position = projectionMatrix * viewMatrix * vec4(scaledCenter + scaledPos, 1.0);
  }
`

export const _FS_scale = `
  uniform vec3 uColor; // 이 값이 흰색으로 설정되어야 합니다.
  uniform vec3 uLandmarks[3];
  uniform vec3 uActivePos;
  uniform float uActiveProgress;
  uniform float uTime;
  uniform float uScale; 

  varying vec3 vInstPos;
  varying vec2 vUv;

  float getRing(float dist, float radius, float thickness) {
    return exp(-pow((dist - radius) / thickness, 2.0));
  }

  void main() {
    float distFromCenter = length(vUv - vec2(0.5));
    //float edge = smoothstep(0.42, 0.48, distFromCenter);
    
    // 기본 채우기 색상을 uColor(흰색)로 변경
    vec3 baseFill = uColor; 
    
    float finalAlpha = 0.01; 
    float finalIntensity = 1.0;
    float radiusFactor = (log2(uScale + 1.0) * 0.4 + 1.0);
    float maxRadius = 18.0 / radiusFactor;

    // 1. 상시 노출 (Ambient)
    for(int i = 0; i < 3; i++) {
      float d = distance(vInstPos, uLandmarks[i]) / uScale; 
      
      // 줌이 작아질수록(줌아웃) 판정 반경을 더 넓게 설정 (5.0 -> 12.0 등 조절 가능)

        float currentRadius = 3.0 * (1.0/radiusFactor)*24.0;
      
      // 거리에 따른 알파값 감쇄 (smoothstep을 사용하여 부드럽게 처리)
      float ambientMask = 1.0 - smoothstep(0.0, currentRadius, d);
      finalAlpha += ambientMask * 0.2;
    }

// 2. 활성화된 랜드마크 효과 (응축되며 채워지는 로직)
if (uActiveProgress > 0.0) {
    float gridDist = distance(vInstPos, uActivePos) / uScale;
    
    // 반지름 설정 (점점 작아짐)
    float lastRadius = 6.0;
    float condenseRadius = mix(maxRadius * 3.0, lastRadius, uActiveProgress);
    
    // [A] 테두리 링 효과
    float thickness = 2.0;
    float ring = getRing(gridDist, condenseRadius, thickness);
    ring *= 0.5; // 링 밝기 줄이기
    
    // [B] 내부 채우기 효과 (핵심)
    // 현재 응축 중인 반지름보다 안쪽 영역을 찾습니다.
    float fillMask = 1.0 - smoothstep(condenseRadius - 2.0, condenseRadius, gridDist);
    
    // Progress가 진행될수록 내부가 더 진하게 채워지도록 설정
    // 0.0일 때는 투명(0), 1.0일 때는 반투명(0.5) 정도로 조절 가능
    float fillIntensity = fillMask * (uActiveProgress * 0.5); 
    
    // [C] 시각적 결합
    // 링(테두리)과 채우기 효과 중 더 큰 값을 선택
    //float activeEffect = fillIntensity;
    float activeEffect = max(ring, fillIntensity);
    
    // 최종 광도와 투명도 업데이트
    finalIntensity = max(finalIntensity, mix(1.0, 3.0, activeEffect));
    finalAlpha = max(finalAlpha, activeEffect);
}

    if (finalAlpha < 0.01) discard;

    // 최종 색상 계산 (모두 uColor 기반)
    vec3 color = baseFill * finalIntensity;
    color += uColor * finalIntensity;

    gl_FragColor = vec4(color, finalAlpha);

    //gl_FragColor = vec4(0.2, 0.2, 0.8, finalAlpha);
  }
`

// --- 랜드마크 아이콘 셰이더 ---
export const _VS_landmark = `
  uniform float uScale;
  uniform float uSize; // 화면에 보일 고정 크기 (예: 20.0)
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    
    // 1. 모델의 중심점을 뷰 공간으로 이동
    vec4 mvPosition = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    
    // 2. 화면상의 크기를 고정합니다.
    float finalScale = uSize * (1.0 / uScale); 
    
    vec4 worldPosition = modelMatrix * vec4(position * finalScale, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vViewPosition = -viewPosition.xyz;

    gl_Position = projectionMatrix * viewPosition;
  }
`

export const _FS_landmark = `
  uniform vec3 uColor; // 이 값이 흰색으로 설정되어야 합니다.
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    // 1. 프레넬 효과
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
    
    // 2. 네온 컬러 및 맥동 효과 (uColor 기반)
    float pulse = Math.sin(uTime * 3.0) * 0.1 + 0.9;
    vec3 neonColor = uColor * (fresnel * 4.0) * pulse;
    
    // 3. 내부 코어
    float core = (1.0 - fresnel) * 0.2;
    
    gl_FragColor = vec4(neonColor + uColor * core, fresnel + core);
  }
`

// --- 반구(Hemisphere) 셰이더 ---
export const _VS_hemisphere = `
  uniform float uScale;
  varying float intensity;
   
  void main() {
    // 1. 정점 위치에 uScale을 적용하여 줌에 따라 크기를 조절합니다.
    vec3 scaledPosition = position * uScale;

    vec4 modelViewPosition = modelViewMatrix * vec4(scaledPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;

    vec3 vNormal = normalize( normalMatrix * normal );
    vec3 vViewDir = normalize( vec3( modelViewMatrix * vec4( scaledPosition, 1.0 ) ) );

    intensity = pow( ( 1.0 + dot( vNormal, vViewDir )*0.5 ) , 5.0);
  }
`

export const _FS_hemisphere = `
  uniform vec3 uColor; // 이 값이 흰색으로 설정되어야 합니다.
  varying float intensity;

  void main() {
    // 기존의 보라색(vec3(0.1, 0.0, 0.3))을 uColor(흰색)로 변경
    vec3 glowColor = uColor; 
    gl_FragColor = vec4(glowColor, intensity);
  }
`
