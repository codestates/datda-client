import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ListInnerCard } from './Index';
import { notice } from '../assets/testdata';
import { StringLiteral } from 'typescript';
import { changeTimeStamp } from '../common/utils/changeTimeStamp';
interface propsType {
  userInfo: any;
  list: any;
}
export default function MiniNotice({ userInfo, list }: propsType) {
  return (
    <Wrap permission={userInfo.permission}>
      <Title>공지사항</Title>
      {list ? (
        <NoticeContainar permission={userInfo.permission}>
          {userInfo.permission === 'parent'
            ? list.map((element: any, index: number) => {
                return (
                  <ListInnerCard
                    content={element}
                    key={element.noticeId}
                    title={element.title}
                  ></ListInnerCard>
                );
              })
            : list.map((element: any, index: number) => {
                return (
                  <ListInnerCard
                    content={element}
                    key={element.noticeId}
                    title={element.title}
                  ></ListInnerCard>
                );
              })}
        </NoticeContainar>
      ) : null}

      <More to="/main/notice">더보기</More>
    </Wrap>
  );
}
const Wrap = styled.div<any>`
  width: 95%;
  height: 20%;
  margin: 0 auto;
  margin-top: 2%;
  margin-bottom: 2%;
  //원장님이 로그인 했을경우
  ${(props) =>
    props.permission === 'institution' &&
    css`
      height: 43%;
    `}
  border: solid 1px #eeeeee;
  @font-face {
    font-family: 'NanumSquareWeb';
    src: url('../fonts/NanumSquareOTFLight.otf');
  }
  font-family: 'NanumSquareWeb';
  display: flex;
  flex-direction: column;
  border-radius: 15px 15px 15px 15px;
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
  text-align: center;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: solid 1px #eeeeee;
`;
const NoticeContainar = styled.div<any>`
  width: 100%;
  height: 70%;
  overflow: auto;
  //원장님이 로그인 했을경우
  ${(props) =>
    props.permission === 'institution' &&
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
  padding: 1%;
  text-align: end;
  margin-right: 2%;
`;
