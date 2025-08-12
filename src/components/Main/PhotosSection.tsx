import React from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'

interface PhotosSectionProps {
  imageData: IGatsbyImageData
}

const PhotosSection: React.FC<PhotosSectionProps> = ({ imageData }) => (
  <div>
    <h2>Photos</h2>
    <GatsbyImage image={imageData} alt="Profile Image" />
  </div>
)

export default PhotosSection
