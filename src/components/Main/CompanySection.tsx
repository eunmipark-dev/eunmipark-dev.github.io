import React from 'react'
import styled from '@emotion/styled'
import { Company } from '@data/about_data'

const CompanyCard = styled.div`
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fff;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  a {
    color: #007bff; /* 블루 테마 */
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

interface CompanySectionProps {
  companies: Company[]
}

const CompanySection: React.FC<CompanySectionProps> = ({ companies }) => (
  <div>
    <h2>Companies</h2>
    {companies.map((company, index) => (
      <CompanyCard key={index}>
        <h3>{company.name}</h3>
        <p>{company.description}</p>
      </CompanyCard>
    ))}
  </div>
)

export default CompanySection
