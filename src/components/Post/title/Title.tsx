import React from 'react';
import './Title.scss';

interface TitleProps {
  title: string;
  slug: string;
}

export default function Title({ title, slug }: TitleProps) {
  return (
    // Header부분에서 .post-title h1.title로 해당 엘리먼트 텍스트 사용 중.
    <a className="post-title" href={`https://weezip.treefeely.com${slug}`}>
      <h1>{title}</h1>
    </a>
  );
}
