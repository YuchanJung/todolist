import { motion, Variants } from "framer-motion";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showingBarState } from "../../atom";
import Arrow from "../icons/Arrow";

const Wrapper = styled(motion.div)`
  width: 300px;
  height: 500px;
  border-radius: 35px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-left: 80px;
`;

const wrapperVariants: Variants = {
  animate: {
    x: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  exit: {
    x: 300,
  },
};

const Header = styled.header`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Setting() {
  const setShowingBar = useSetRecoilState(showingBarState);
  return (
    <Wrapper
      onClick={() => setShowingBar((prev) => !prev)}
      variants={wrapperVariants}
      animate="animate"
      exit="exit"
      transition={{ type: "tween", duration: 0.3 }}
    >
      <Header>
        <Arrow direction={true} className="backHome"/>
      </Header>
    </Wrapper>
  );
}

export default Setting;
