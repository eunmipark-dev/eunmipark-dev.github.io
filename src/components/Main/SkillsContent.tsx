import React from 'react'
import styled from '@emotion/styled'
import { Skill } from '@data/about_data'

const SkillItem = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 8px 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 0.9rem;
`

interface SkillsContentProps {
  skills: Skill[]
}

const SkillsContent: React.FC<SkillsContentProps> = ({ skills }) => (
  <>
    {skills.map((skill, index) => (
      <SkillItem key={index}>{skill}</SkillItem>
    ))}
  </>
)

export default SkillsContent
