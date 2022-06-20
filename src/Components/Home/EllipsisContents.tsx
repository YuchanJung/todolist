import { motion, Variants } from "framer-motion";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  allToDosState,
  dateState,
  IAllToDos,
  IToDo,
  returnDateKey,
  TODOS_KEY,
} from "../../atom";
import MagnifyingGlassIcon from "../Icons/MagnifyingGlassIcon";
import XIcon from "../Icons/XIcon";

const Box = styled(motion.div)`
  position: absolute;
  right: 42px;
  top: 35px;
  background-color: ${(props) => props.theme.background.ellpsisContents};
  box-shadow: rgba(15, 15, 18, 0.25) 0px 4px 8px -2px,
    rgba(15, 15, 18, 0.08) 0px 0px 0px 1px;
  width: 150px;
  height: 65px;
  min-height: 65px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
`;

const Row = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  padding: 0px 8px;
  margin: 3px 0px;
`;

const Span = styled.span`
  margin-left: 7px;
`;

const DeleteButton = styled.button`
  width: 20px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MagnifyButton = styled(DeleteButton)``;

const boxVariants: Variants = {
  hidden: {
    x: 10,
    y: -10,
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
};

interface IEllipsisContents {
  id: number;
}

function returnDeletedToDos(oldToDos: IToDo[], targetIndex: number) {
  return [
    ...oldToDos.slice(0, targetIndex),
    ...oldToDos.slice(targetIndex + 1),
  ];
}

function EllipsisContents({ id }: IEllipsisContents) {
  const setAllToDos = useSetRecoilState(allToDosState);
  const dateKey = returnDateKey(useRecoilValue(dateState));
  const deleteToDo = () => {
    setAllToDos((prevAllToDos) => {
      const oldToDos = prevAllToDos[dateKey].toDos;
      const targetIndex = oldToDos.findIndex((td) => td.id === id);
      const newToDos = returnDeletedToDos(oldToDos, targetIndex);
      const newAllToDos: IAllToDos = {
        ...prevAllToDos,
        [dateKey]: { toDos: newToDos },
      };
      localStorage.setItem(TODOS_KEY, JSON.stringify(newAllToDos));
      return newAllToDos;
    });
  };
  return (
    <Box
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: "tween", duration: 0.1 }}
    >
      <Row>
        <DeleteButton onClick={deleteToDo}>
          <XIcon />
        </DeleteButton>
        <Span>Delete Task</Span>
      </Row>
      <Row>
        <MagnifyButton>
          <MagnifyingGlassIcon />
        </MagnifyButton>
        <Span>About Task</Span>
      </Row>
    </Box>
  );
}

export default EllipsisContents;
