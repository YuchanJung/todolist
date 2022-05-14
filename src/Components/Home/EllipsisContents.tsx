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
  height: 60px;
  min-height: 60px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
`;

const boxVariants: Variants = {
  initial: {
    x: 10,
    y: -10,
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {
    x: 10,
    y: -10,
    scale: 0.8,
    opacity: 0,
  },
};

const Div = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  padding: 0px 7px;
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

interface IEllipsisContents {
  id: number;
}

function deletedToDos(oldToDos: IToDo[], targetIndex: number) {
  return [
    ...oldToDos.slice(0, targetIndex),
    ...oldToDos.slice(targetIndex + 1),
  ];
}

function EllipsisContents({ id }: IEllipsisContents) {
  const setAllToDos = useSetRecoilState(allToDosState);
  const dateKey = returnDateKey(useRecoilValue(dateState));
  const onDelete = () => {
    setAllToDos((prevAllToDos) => {
      const oldToDos = prevAllToDos[dateKey].toDos;
      const targetIndex = oldToDos.findIndex((td) => td.id === id);
      const newToDos = deletedToDos(oldToDos, targetIndex);
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
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", duration: 0.1 }}
    >
      <Div>
        <DeleteButton onClick={onDelete}>
          <XIcon />
        </DeleteButton>
        <Span>Delete Task</Span>
      </Div>
      <Div>
        <MagnifyButton>
          <MagnifyingGlassIcon />
        </MagnifyButton>
        <Span>About Task</Span>
      </Div>
    </Box>
  );
}

export default EllipsisContents;
