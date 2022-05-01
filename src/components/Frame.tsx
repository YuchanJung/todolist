import { motion, Variants } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { showingBarState } from "../atom";
import Home from "./Home/Home";
import Setting from "./Setting/Setting";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBox = styled.div`
  width: 380px;
  height: 500px;
  border-radius: 35px;
  box-shadow: -2px 4px 20px 6px ${(props) => props.theme.cardShadowColor};
  background-color: ${(props) => props.theme.cardBgColor};
  overflow: hidden;
`;

const Pages = styled(motion.div)`
  // Home + Setting
  width: 680px;
  height: 500px;
  background-color: ${(props) => props.theme.settingBgColor};
  display: flex;
`;

const pagesVariants: Variants = {
  animate: (showingBar: boolean) => ({
    x: showingBar ? -300 : 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  }),
};

function Frame() {
  const showingBar = useRecoilValue(showingBarState);
  return (
    <Container>
      <MainBox>
        <Pages custom={showingBar} variants={pagesVariants} animate="animate">
          <Home />
          <Setting />
        </Pages>
      </MainBox>
    </Container>
  );
}

export default Frame;
