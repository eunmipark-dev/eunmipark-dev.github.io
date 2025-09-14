import React from 'react'
import styled from '@emotion/styled'
import { Company } from '@data/about_data'

const CompanyTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
`

const CompanyDetails = styled.p`
  margin: 2px 0;
  color: #666;
`

interface CompaniesContentProps {
  companies: Company[]
}

const CompaniesContent: React.FC<CompaniesContentProps> = ({ companies }) => (
  <>
    {companies.map((company, index) => (
      <div key={index}>
        <CompanyTitle>{company.name}</CompanyTitle>
        <CompanyDetails>Period: {company.period}</CompanyDetails>
        <CompanyDetails>Roles: {company.roles.join(', ')}</CompanyDetails>
      </div>
    ))}
  </>
)

export default CompaniesContent
