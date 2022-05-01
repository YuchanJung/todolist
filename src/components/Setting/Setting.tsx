import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showingBarState } from "../../atom";
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

const PrevButton = styled.button`
  border: none;
  background-color: transparent;
`;

function Setting() {
  const setShowingBar = useSetRecoilState(showingBarState);
  return (
    <Wrapper>
      <Header>
        <PrevButton onClick={() => setShowingBar((prev) => !prev)}>
          <Arrow direction={true} className="backHome" />
        </PrevButton>
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
