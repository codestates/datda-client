import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { notice } from '../assets/testdata';
import { ListInnerCard } from './Index';
interface propsType {
  title: string;
  fristCategory?: string;
  secondCategory?: string;
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
  match: RouteComponentProps['match'];
}
function ListForm({ title, fristCategory, secondCategory, match }: propsType) {
  console.log('현재 url', match.path);
  return (
    <Wrap>
      <Title>{title}</Title>
      <CategoryWrap>
        <CategoryNotice>{fristCategory}</CategoryNotice>
        <CategoryEvent>{secondCategory}</CategoryEvent>
        <CategoryYear>년도별 검색</CategoryYear>
      </CategoryWrap>
      <CardWrapper>
        {notice.data.map((notice, index) => {
          return (
            <ListInnerCard
              key={index}
              noticeId={notice.noticeId}
              title={notice.title}
              category={notice.category}
              createAt={notice.created_at}
            ></ListInnerCard>
          );
        })}
      </CardWrapper>
      <ButtonWrapper>
        <WireButton to={`${match.path}/write`}>작성</WireButton>
      </ButtonWrapper>
    </Wrap>
  );
}
export default withRouter(ListForm);
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentCard = styled.div`
  margin-bottom: 3%;
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
`;
const CategoryWrap = styled.div`
  width: 95%;
  height: auto;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid lightgray;
  padding-bottom: 1%;
`;
const CategoryNotice = styled.span`
  flex: 1 auto;
`;
const CategoryEvent = styled.span`
  flex: 1 auto;
`;
const CategoryYear = styled.span`
  flex: 11 auto;
  text-align: right;
`;
const CardWrapper = styled.div`
  width: 98%;
  height: 94%;
  margin: 0 auto;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  width: 95%;
  text-align: center;
  margin: 0 auto;
`;
const WireButton = styled(Link)`
  text-decoration: none;
  ${({ theme }) => theme.common.defaultButton}
`;