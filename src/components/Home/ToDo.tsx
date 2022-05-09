import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import {
  allToDosState,
  dateState,
  IAllToDos,
  IToDo,
  returnDateKey,
  TODOS_KEY,
} from "../../atom";
import CheckIcon from "../icons/CheckIcon";
import EllipsisVerticalIcon from "../icons/EllipsisVerticalIcon";
import EllipsisContents from "./EllipsisContents";
import DragButton from "./DragButton";

const Wrapper = styled.div<{ isDragging: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 42px;
  padding: 0px 20px 0px 30px;
  margin: 5px 0px;
  background-color: ${(props) =>
    props.isDragging ? props.theme.whileDraggingColor : "none"};
`;

const CheckBox = styled.div<ICheckedProps>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-top: 2px;
  border: 2px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.homeBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in;
  ${(props) =>
    props.checked &&
    css`
      border: 0px;
      background-color: ${(props) => props.theme.checkBoxColor};
    `}
`;

const Text = styled.span<ICheckedProps>`
  display: inline-block;
  width: 200px;
  font-size: 24px;
  transition: 0.2s ease-in;
  margin-left: 14px;
  ${(props) =>
    props.checked &&
    css`
      color: ${(props) => props.theme.accentColor};
      text-decoration: line-through;
    `}
`;

const DragBox = styled.div`
  width: 40px;
  height: 40px;
  min-height: 40px;
`;

interface ICheckedProps {
  checked: boolean;
}

const Ellipsis = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IToDoProps {
  toDo: IToDo;
  index: number;
}

// for changing checked or categories
function addedToDos(oldToDos: IToDo[], newToDo: IToDo, targetIndex: number) {
  return [
    ...oldToDos.slice(0, targetIndex),
    newToDo,
    ...oldToDos.slice(targetIndex + 1),
  ];
}

function ToDo({ toDo, index }: IToDoProps) {
  const [clickedEllipsis, setClickedEllipsis] = useState(false);
  const { text, id, category, checked, date } = toDo;
  const setAllToDos = useSetRecoilState(allToDosState);
  const dateKey = returnDateKey(useRecoilValue(dateState));
  const onCheck = () => {
    setAllToDos((prevAllToDos) => {
      const oldToDos = prevAllToDos[dateKey].toDos;
      const targetIndex = oldToDos.findIndex((td) => td.id === id);
      const newToDo = { text, id, category, checked: !checked, date };
      const newToDos = addedToDos(oldToDos, newToDo, targetIndex);
      const newAllToDos: IAllToDos = {
        ...prevAllToDos,
        [dateKey]: { toDos: newToDos },
      };
      localStorage.setItem(TODOS_KEY, JSON.stringify(newAllToDos));
      return newAllToDos;
    });
  };
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <CheckBox onClick={onCheck} checked={checked}>
            {checked && <CheckIcon />}
          </CheckBox>
          <Text checked={checked}>{text}</Text>
          <DragBox {...provided.dragHandleProps}>
            <DragButton />
          </DragBox>
          <Ellipsis onClick={() => setClickedEllipsis((prev) => !prev)}>
            <EllipsisVerticalIcon />
          </Ellipsis>
          <AnimatePresence>
            {clickedEllipsis && <EllipsisContents id={id} />}
          </AnimatePresence>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(ToDo);
