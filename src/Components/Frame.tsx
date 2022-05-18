import { motion, Variants } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import {
  isDarkState,
  showingSettingPageState,
} from "../atom";
import CreateToDo from "./Create/CreateToDo";
import Home from "./Home/Home";
import Overlay from "./Home/Overlay";
import Setting from "./Setting/Setting";

const Container = styled.div`
  width: 100vw;
  min-width: 400px;
  height: 100vh;
  min-height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBox = styled.div<{ isDark: boolean }>`
  width: 380px;
  height: 500px;
  border-radius: 35px;
  background-color: ${(props) => props.theme.background.home};
  position: relative;
  overflow: hidden;
  ${(props) =>
    props.isDark
      ? css`
          box-shadow: rgba(0, 0, 0, 0.56) 0px 15px 40px 4px;
        `
      : css`
          box-shadow: rgba(7, 5, 5, 0.2) 0px 12px 28px 0px,
            rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
            rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
        `}
`;

const Pages = styled(motion.div)`
  // Home + Setting
  width: 680px;
  height: 500px;
  background-color: black;
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
  const isDark = useRecoilValue(isDarkState);
  const showingSettingPage = useRecoilValue(showingSettingPageState);
  return (
    <Container>
      <MainBox isDark={isDark}>
        <Pages
          custom={showingSettingPage}
          variants={pagesVariants}
          animate="animate"
        >
          <Home />
          <Setting />
          <CreateToDo />
          <Overlay />
        </Pages>
      </MainBox>
    </Container>
  );
}

export default Frame;
