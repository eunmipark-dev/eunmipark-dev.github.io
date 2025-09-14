import React from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'

const PhotoWrapper = styled.div`
  text-align: center;
  margin-bottom: 40px;

  .profile-img {
    border-radius: 50%; /* Circular for modernity */
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 4px solid #e0e0e0; /* Subtle border */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

interface PhotosSectionProps {
  imageData: IGatsbyImageData
}

const PhotosSection: React.FC<PhotosSectionProps> = ({ imageData }) => (
  <section>
    <h2>Photos</h2>
    <PhotoWrapper>
      <GatsbyImage
        image={imageData}
        alt="Profile Image"
        className="profile-img"
      />
    </PhotoWrapper>
  </section>
)

export default PhotosSection
