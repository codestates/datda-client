import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimeTableCard } from '../components/Index';
import { requestUploadTimetable } from '../common/axios';
import { ChangeToArray } from '../common/utils/findCurrentEducation';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
interface propType {
  userInfo: any;
  timetable: any;
  handleAddTimetable: any;
  type: string;
  handledAddCard: any;
  handleDeleteCard: any;
  handleUpdateTimetable: any;
  handlePostTimetable: any;
  handleTimetableChange: any;
}
export default function TimtableListForm({
  userInfo,
  type,
  timetable,
  handledAddCard,
  handleDeleteCard,
  handleTimetableChange,
  handlePostTimetable,
  handleAddTimetable,
  handleUpdateTimetable,
}: propType) {
  const urlMatch = useRouteMatch();
  const PREVIOUS_PAGE = -1;
  return (
    <Wrap>
      <Title>시간표</Title>
      <ContentCard>
        {timetable.list.map((element: any, index: number) => {
          return (
            <TimeTableCard
              key={index}
              type={type}
              timetable={element}
              handleUpdateTimetable={handleUpdateTimetable}
            ></TimeTableCard>
          );
        })}
        {urlMatch.path === '/main/timetable/write' ? (
          <>
            <AddText>
              <AddButton onClick={handledAddCard}>시간표 추가</AddButton>
              <AddButton onClick={handleDeleteCard}>시간표 삭제</AddButton>
            </AddText>
          </>
        ) : null}
      </ContentCard>
      {(() => {
        if (userInfo.permission === 'institution') {
          if (type === 'write') {
            return (
              <ButtonWrapper>
                <Button onClick={() => history.go(PREVIOUS_PAGE)}>취소</Button>
                <Button onClick={handlePostTimetable}>등록</Button>
              </ButtonWrapper>
            );
          }
          return (
            <ButtonWrapper>
              <WireButton to={`${urlMatch.path}/write`}>작성</WireButton>
            </ButtonWrapper>
          );
        }
      })()}
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 95%;
`;
const ContentCard = styled.div`
  height: 87%;
  overflow: auto;
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
  width:100%;
  border-bottom: 1px solid lightgray;
`;
const AddText = styled.div`
  width: 100%;
  height: 3%;
  text-align: center;
  margin-top: 3%;
  color: #6f6eff;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const AddButton = styled.span`
  margin-left: 4%;
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  width: 95%;
  text-align: center;
  margin: 0 auto;
  margin-top: 5%;
`;
const WireButton = styled(Link)`
  text-decoration: none;
  ${({ theme }) => theme.common.defaultButton}
`;
const Button = styled.span`
  text-decoration: none;
  margin-left: 2%;
  ${({ theme }) => theme.common.defaultButton}
`;
