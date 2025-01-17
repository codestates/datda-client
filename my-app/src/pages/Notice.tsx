import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Link,
  match,
  Route,
  Switch,
  useRouteMatch,
  RouteComponentProps,
} from 'react-router-dom';
import {
  ReadForm,
  ListForm,
  WriteNotice,
  WriteForm,
} from '../components/Index';
interface propsType {
  list: any;
  handleUpdateList: any;
  handleChangeNotice: any;
  userInfo: {
    permission: string;
    isLogin: boolean;
    mainData: any;
    currentChild: number;
  };
}
function Notice({
  userInfo,
  list,
  handleUpdateList,
  handleChangeNotice,
}: propsType) {
  const urlMatch = useRouteMatch();
  const [inputVlaue, setInputValue] = useState({
    title: '',
    content: '',
    type: '',
    category: '',
  });
  // 카테고리에 대한 상태
  const [radioButton, setRadioButton] = useState('');
  //카테고리 상태변환
  const handleClickRadioButton = (category: string) => {
    setInputValue({
      ...inputVlaue,
      category: category,
    });
  };
  // 사용자 입력 값 핸들러
  const handleInputValue = (
    name: string,
    content: string,
    type: string,
    category: string,
  ) => {
    setInputValue({
      ...inputVlaue,
      [name]: content,
      type: type,
    });
  };
  // useEffect(() => {
  //   return () => {
  //     console.log(inputVlaue, '사용자 입력값');
  //   };
  // }, [inputVlaue, radioButton]);
  return (
    <Wrap>
      <Switch>
        <Route exact path={`${urlMatch.path}`}>
          <ListForm
            permission={userInfo.permission}
            title="공지사항"
            contents={list.currentList}
            handleUpdateList={handleUpdateList}
            handleChangeNotice={handleChangeNotice}
            fristCategory="공지사항"
            secondCategory="행사"
          ></ListForm>
        </Route>
        <Route exact path={`${urlMatch.path}/write`}>
          <WriteForm
            radioButton={radioButton}
            inputVlaue={inputVlaue}
            handleInputValue={handleInputValue}
            userInfo={userInfo}
            fristCategory="공지사항"
            handleClickRadioButton={handleClickRadioButton}
            secondCategory="행사"
            title="공지사항 작성"
            type="notice"
          ></WriteForm>
        </Route>
        <Route
          exact
          path={`${urlMatch.path}/post/:no`}
          render={() => (
            <ReadForm contents={list.currentList} title="공지사항"></ReadForm>
          )}
        ></Route>
      </Switch>
    </Wrap>
  );
}
export default Notice;
const Wrap = styled.div`
  width: 100%;
  height: 97%;
`;
