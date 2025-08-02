import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import { useNotion } from '@hooks/useNotion'

const InfoPage = function () {
  const { posts } = useNotion()
  console.log(posts)
  return <div>hi</div>
}

export default InfoPage
