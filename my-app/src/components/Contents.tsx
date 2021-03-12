import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Timetable,
  Carousel,
  MiniNotice,
  MIniIndiNotice,
  MainMenu,
} from './Index';
interface propsType {
  list: any;
  userInfo: any;
  handleChangeChild: (index: number) => void;
}
export default function Contents({
  userInfo,
  handleChangeChild,
  list,
}: propsType) {
  //탭 메뉴 상태
  const [clickedMenu, setClickedMenu] = useState(0);
  //탭 메뉴 클릭 이벤트
  const handleChangeMenu = (menu: number) => {
    setClickedMenu(menu);
    handleChangeChild(menu);
  };
  return (
    <Wrap>
      {userInfo.permission === 'parent' ? (
        <BookMarkWrap>
          {userInfo.mainData.map((element: any, index: number) => {
            return (
              <BookMark
                key={index}
                childId={element.childId}
                checked={clickedMenu}
                order={`${userInfo.mainData.length}0`}
                className={clickedMenu === index ? 'active' : ''}
                onClick={() => handleChangeMenu(index)}
              >
                <Name>{element.childName}</Name>
              </BookMark>
            );
          })}

          {/* <BookMark
            checked={clickedMenu}
            order={20}
            className={clickedMenu === 1 ? 'active' : ''}
            onClick={() => handleChangeMenu(1)}
          >
            {' '}
            <Name>{'심종훈'}</Name>
          </BookMark>
          <BookMark
            checked={clickedMenu}
            order={10}
            className={clickedMenu === 2 ? 'active' : ''}
            onClick={() => handleChangeMenu(2)}
          >
            {' '}
            <Name>{'박한솔'}</Name>
          </BookMark> */}
        </BookMarkWrap>
      ) : null}
      <Timetable userInfo={userInfo}></Timetable>
      <MainMenu></MainMenu>
      <MiniNotice userInfo={userInfo} list={list.mainMiniNotice}></MiniNotice>
      {(() => {
        if (
          userInfo.permission === 'teacher' ||
          userInfo.permission === 'parent'
        ) {
          return (
            <>
              <MIniIndiNotice
                userInfo={userInfo}
                list={list.mainMiniIndiNotice}
              ></MIniIndiNotice>
            </>
          );
        }
        return null;
      })()}

      <Carousel userInfo={userInfo}></Carousel>
    </Wrap>
  );
}
interface Property {
  checked: number;
  order: number;
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const BookMark = styled.button<any>`
  width: 60px;
  background: white;
  border-radius: 7px 7px 0px 0px;
  // transform: perspective(100px) rotateX(45deg);
  cursor: pointer;
  border: 0;
  outline: 0;
  z-index: ${(props) => props.order};
  box-shadow: 0px 0px 5px #c8c8c8;
  &:focus {
    display: none;
  }
`;
const BookMarkWrap = styled.div`
  display: flex;
  padding-left: 20px;
  position: relative;
  top: -24px;
  button div {
    color: #bcbbbb;
  }
  .active {
    background: #6f6eff;
    color: #0b0c21;
    z-index: 100;
    div {
      color: white;
    }
  }
`;
const Name = styled.div`
  color: white;
  font-size: 1rem;
  transform: unset;
  margin-top: 6px;
  // transform: perspective(40px) rotateX(-15deg);
`;
const ListWrapper = styled.div`
  width: 100%;
  height: 37%;
  padding: 2%;
`;
