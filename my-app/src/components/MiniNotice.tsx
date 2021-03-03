import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ListInnerCard } from './Index';
import { notice } from '../assets/testdata';
import { StringLiteral } from 'typescript';
interface propsType {
  permission: string;
}
export default function MiniNotice({ permission }: propsType) {
  return (
    <Wrap permission={permission}>
      <Title>공지사항</Title>
      <NoticeContainar permission={permission}>
        {notice.data.map((element, index) => {
          return (
            <ListInnerCard
              noticeId={element.noticeId}
              key={index}
              title={element.title}
              category={element.category}
              createAt={element.created_at}
            ></ListInnerCard>
          );
        })}
      </NoticeContainar>
      <More to="/main/notice">더보기</More>
    </Wrap>
  );
}
const Wrap = styled.div<propsType>`
  width: 95%;
  height: 20%;
  margin: 0 auto;
  margin-top: 2%;
  //원장님이 로그인 했을경우
  ${(props) =>
    props.permission === 'director' &&
    css`
      height: 43%;
    `}
`;

const NoticeWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 80%;
  border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;
`;
const Title = styled.label`
  font-size: 1.5rem;
`;
const NoticeContainar = styled.div<propsType>`
  width: 100%;
  height: 70%;
  overflow: auto;
  //원장님이 로그인 했을경우
  ${(props) =>
    props.permission === 'director' &&
    css`
      height: 85%;
    `}
`;

const GoToPostButton = styled(Link)`
  flex: 1 auto;
  font-size: 3rem;
  color: #bcbbbb;
`;
const More = styled(Link)<any>`
  display: block;
  padding: 2%;
  text-align: end;
`;
