import { motion, Variants } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isBarsClickedState, isEllipsisClickedState } from "../atom";
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

const MainBox = styled.div`
  width: 380px;
  height: 500px;
  border-radius: 35px;
  box-shadow: -2px 4px 20px 6px ${(props) => props.theme.frameShadowColor};
  background-color: ${(props) => props.theme.homeBgColor};
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
  background-color: ${(props) => props.theme.homeBgColor};
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
  const [isBarsClicked, setIsBarsClicked] = useRecoilState(isBarsClickedState);
  const [isEllipsisClicked, setIsEllipsisClicked] = useRecoilState(
    isEllipsisClickedState
  );
  return (
    <Container>
      <MainBox>
        <Pages custom={isBarsClicked} variants={pagesVariants} animate="animate">
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
    </Container>
  );
}

export default Frame;
