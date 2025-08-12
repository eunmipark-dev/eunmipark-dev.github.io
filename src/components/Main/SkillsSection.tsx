import React from 'react'
import styled from '@emotion/styled'
import { Skill } from '@data/about_data'

const Bubble = styled.span`
  display: inline-block;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 20px;
  background: #007bff; /* 블루 테마 */
  color: white;
  font-size: 0.9rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`

interface SkillsSectionProps {
  skills: Skill[]
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => (
  <div>
    <h2>Skills</h2>
    {skills.map(skill => (
      <Bubble key={skill}>{skill}</Bubble>
    ))}
  </div>
)

export default SkillsSection
