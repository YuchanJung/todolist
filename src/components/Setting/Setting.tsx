import styled from "styled-components";
import Arrow from "../icons/Arrow";
import DarkModeButton from "./DarkModeButton";

const Wrapper = styled.div`
  width: 300px;
  min-width: 300px;
  height: 500px;
  background-color: ${(props) => props.theme.settingBgColor};
`;

const Header = styled.header`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 25px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Contents = styled.div`
  width: 100%;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingDarkMode = styled.div`
  width: 100%;
  padding: 0 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Setting() {
  return (
    <Wrapper>
      <Header>
        <Arrow direction={true} className="backHome" />
        <Title>Setting</Title>
      </Header>
      <Contents>
        <SettingDarkMode>
          <span style={{ fontSize: 18 }}>Dark Mode</span>
          <DarkModeButton />
        </SettingDarkMode>
      </Contents>
    </Wrapper>
  );
}

export default Setting;
