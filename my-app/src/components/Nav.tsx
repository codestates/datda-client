import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
interface propsType {
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
  match: RouteComponentProps['match'];
}
function Nav({ history }: propsType) {
  return (
    <Wrap>
      <WrapLinks>
        <Space></Space>
        <LogoWrapper to="/main">
          <Logo src="../images/logo.png" alt="logo"></Logo>
          <Name>{'datda'}</Name>
        </LogoWrapper>

        {/* <label onClick={() => history.push('/main/profile')}>프로필</label> */}
        <Links to="/">Log out</Links>
      </WrapLinks>
    </Wrap>
  );
}
//해당 컴포넌트는 route컴포넌트가 아니기때문에
//history를 사용 할 수 없어 withRouter사용
export default withRouter(Nav);
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  box-shadow: 0 4px 4px -1px #c8c8c8;
`;
const LogOut = styled.span`
  flex: 1 auto;
`;
const Links = styled(Link)`
  color: black;
  align-self: center;
  padding-right: 2%;
  ${({ theme }) => theme.fontSizes.base};
`;
const WrapLinks = styled.div`
  align-self: center;
  width: 100%;
  display: flex;
  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
    display: flex;
    a {
      flex: 1 auto;
      text-align: center;
    }
  }
`;

const LogoWrapper = styled(Link)<any>`
  display: flex;
  justify-content: center;
  flex: 22 auto;
`;
const Logo = styled.img`
  width: 30px;
  height: 20px;
`;

const Space = styled.span`
  flex: 1 auto;
`;

const Name = styled.span`
  font-size: 1.6rem;
`;
