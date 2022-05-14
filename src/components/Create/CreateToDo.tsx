import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isCreateButtonClickedState } from "../../atom";

const Wrapper = styled(motion.div)`
  position: absolute;
  width: 380px;
  min-width: 380px;
  height: 500px;
  border-radius: 35px;
  background-color: ${(props) => props.theme.background.createToDo};
  transform-origin: bottom center;
`;

function CreateToDo() {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useRecoilState(
    isCreateButtonClickedState
  );
  const pageAnimation = useAnimation();
  const toggleClicked = () => {
    setIsCreateButtonClicked((prev) => !prev);
  };
  useEffect(() => {
    if (isCreateButtonClicked) {
      pageAnimation.start({ scaleY: 1 });
    } else {
      pageAnimation.start({ scaleY: 0 });
    }
  }, [isCreateButtonClicked]);
  return (
    <Wrapper
      initial={{ scaleY: 0 }}
      animate={pageAnimation}
      transition={{ type: "tween", duration: 0.2 }}
      onClick={toggleClicked}
    ></Wrapper>
  );
}

export default CreateToDo;
