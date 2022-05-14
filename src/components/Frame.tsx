import { motion, Variants } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import {
  isBarsClickedState,
  isCreateButtonClickedState,
  isDarkState,
  isEllipsisClickedState,
} from "../atom";
import CreateToDo from "./Create/CreateToDo";
import Home from "./Home/Home";
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
  background-color: ${(props) => props.theme.background.setting};
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

const ContainerOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  opacity: 0;
`;

const HomeOverlay = styled(motion.div)`
  width: 380px;
  min-width: 380px;
  height: 500px;
  border-radius: 35px;
  background-color: ${(props) => props.theme.background.home};
  position: absolute;
`;

const homeOverlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.6,
    transition: {
      duration: 0.5,
    },
  },
};

function Frame() {
  const isDark = useRecoilValue(isDarkState);
  const [isBarsClicked, setIsBarsClicked] = useRecoilState(isBarsClickedState);
  const [isEllipsisClicked, setIsEllipsisClicked] = useRecoilState(
    isEllipsisClickedState
  );
  const isCreateButtonClicked = useRecoilValue(isCreateButtonClickedState);
  return (
    <Container>
      <MainBox isDark={isDark}>
        <Pages
          custom={isBarsClicked}
          variants={pagesVariants}
          animate="animate"
        >
          <Home />
          {isBarsClicked && (
            <HomeOverlay
              onClick={() => setIsBarsClicked((prev) => !prev)}
              variants={homeOverlayVariants}
              initial="initial"
              animate="animate"
            />
          )}
          <Setting />
        </Pages>
      </MainBox>
      {isEllipsisClicked && (
        <ContainerOverlay onClick={() => setIsEllipsisClicked(false)} />
      )}
      {isCreateButtonClicked && <CreateToDo />}
    </Container>
  );
}

export default Frame;
