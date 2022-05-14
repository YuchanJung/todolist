import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isCreateButtonClickedState } from "../../atom";

const Wrapper = styled(motion.div)`
  position: absolute;
  width: 380px;
  min-width: 380px;
  height: 500px;
  background-color: ${(props) => props.theme.background.createToDo};
`;

function CreateToDo() {
  const setIsCreateButtonClicked = useSetRecoilState(isCreateButtonClickedState);
  const toggleClicked = () => setIsCreateButtonClicked((prev) => !prev);
  return <Wrapper layoutId="create" onClick={toggleClicked}></Wrapper>;
}

export default CreateToDo;
