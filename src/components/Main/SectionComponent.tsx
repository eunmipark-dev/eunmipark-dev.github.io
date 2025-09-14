import React from 'react'
import styled from '@emotion/styled'

const SectionWrapper = styled.section`
  margin: 20px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e0e0e0;
`

const ItemList = styled.div`
  & > *:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 15px;
  }
`

interface SectionComponentProps {
  title: string
  children: React.ReactNode
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  children,
}) => (
  <SectionWrapper>
    <Title>{title}</Title>
    <ItemList>{children}</ItemList>
  </SectionWrapper>
)

export default SectionComponent
