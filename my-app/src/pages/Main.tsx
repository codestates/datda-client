import React from 'react';
import {
  Nav,
  Avatar,
  Contents,
  State,
  SubMenu,
  FooterContents,
} from '../components/Index';
import styled from 'styled-components';
function Main() {
  return (
    <Wrap>
      <Header id="header">
        <Nav></Nav>
      </Header>
      <Aside id="aside">
        <TopSubNav id="top-submenu"></TopSubNav>
        <FristPart id="avatar">
          <Avatar></Avatar>
        </FristPart>
        <SecondPart id="state">
          <State></State>
        </SecondPart>
        <ThirdPart id="submenu">
          <SubMenu></SubMenu>
        </ThirdPart>
      </Aside>
      <Section id="content">
        <Contents></Contents>
      </Section>
      <Footer>
        <FooterContents></FooterContents>
      </Footer>
    </Wrap>
  );
}

export default Main;

const Wrap = styled.div`
  width: 900px;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    #header {
      position: fixed;
      bottom: 0px;
      background: #6f6eff;
      width: 100%;
      margin-bottom: 0px;
    }
    #top-submenu {
      width: 100%;
    }
    #aside {
      width: 100%;
      height: 40%;
    }
    #content {
      width: 100%;
    }
    #avatar {
      width: 90%;
      height: 220px;
      margin: 0 auto;
    }
    #state {
      width: 90%;
      height: 20%;
      margin: 0 auto;
      div {
        display: flex;
        height: fit-content;
        gap: 1%;
      }
    }
    #submenu {
      display: none;
    }
  } ;
`;
const Header = styled.div`
  width: 100%;
  height: 50px;
  padding: 1%;
  margin-bottom: 7%;
`;
const Aside = styled.div`
  width: 30%;
  height: 900px;
  float: left;
  padding: 2%;
`;
const Section = styled.div`
  width: 70%;
  height: 900px;
  float: left;
  padding: 2%;
`;
const Footer = styled.div`
  width: 100%;
  height: 80px;
  clear: both;
  padding: 5%;
  margin-bottom: 50px;
`;
const TopSubNav = styled.div`
  width: 100%;
  widht: 50px;
`;
const FristPart = styled.div`
  width: 100%;
  height: 30%;
  padding: 2%;
`;
const SecondPart = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  padding: 2%;
`;
const ThirdPart = styled.div`
  width: 100%;
  height: 50%;
  padding: 2%;
`;
const TimetableSection = styled.div`
  width: 100%;
  height: 25%;
`;
const MainMenuSection = styled.div`
  width: 100%;
  height: 25%;
`;
const MiniNoticeSection = styled.div`
  width: 100%;
  height: 25%;
`;
const MiniIndiNoticeSection = styled.div`
  width: 100%;
  height: 25%;
`;

// const Button = styled.button`
//   ${({ theme }) => theme.common.defaultButton}
// `;
// const Input = styled.input`
//   ${({ theme }) => theme.common.defaultInput}
// `;
// const Avatar = styled.img`
//   ${({ theme }) => theme.common.profileImageDiv}
// `;
// const Card = styled.div`
//   ${({ theme }) => theme.common.albumCardDiv}
// `;