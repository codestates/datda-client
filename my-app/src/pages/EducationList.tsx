import React from 'react';
import styled from 'styled-components';
export default function EducationList() {
  return (
    <Wrap>
      <ContentCard>
        <Title>교육 프로그램</Title>
      </ContentCard>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const ContentCard = styled.div`
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
`;