import React from "react";
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
import Check from "../icons/Check";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  min-height: 40px;
  padding: 0px 10px;
  margin: 5px 0px;
`;

const CheckBox = styled.div<ICheckedProps>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-top: 2px;
  border: 2px solid ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in;
  ${(props) =>
    props.checked &&
    css`
      border: 0px;
      color: ${(props) => props.theme.checkColor};
      background-color: ${(props) => props.theme.checkBoxColor};
    `}
`;

const Text = styled.span<ICheckedProps>`
  display: inline-block;
  position: absolute;
  left: 50px;
  font-size: 24px;
  transition: 0.2s ease-in;
  ${(props) =>
    props.checked &&
    css`
      text-decoration: line-through;
      color: ${(props) => props.theme.accentColor};
    `}
`;

interface ICheckedProps {
  checked: boolean;
}

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  width: 65px;
  height: 30px;
  border-radius: 15px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.textColor};
`;

interface IDraggableToDoProps {
  toDo: IToDo;
  index: number;
}

function deletedToDos(oldToDos: IToDo[], targetIndex: number) {
  return [
    ...oldToDos.slice(0, targetIndex),
    ...oldToDos.slice(targetIndex + 1),
  ];
}

// for changing checked or categories
function addedToDos(oldToDos: IToDo[], newToDo: IToDo, targetIndex: number) {
  return [
    ...oldToDos.slice(0, targetIndex),
    newToDo,
    ...oldToDos.slice(targetIndex + 1),
  ];
}

function DraggableToDo({ toDo, index }: IDraggableToDoProps) {
  const { text, id, category, checked, date } = toDo;
  const setAllToDos = useSetRecoilState(allToDosState);
  const dateKey = returnDateKey(useRecoilValue(dateState));
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    /* 
    const {
      currentTarget: { name },
    } = event;
    */
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
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <CheckBox onClick={onCheck} checked={checked}>
            {checked && <Check />}
          </CheckBox>
          <Text checked={checked}>{text}</Text>
          <DeleteButton name="DELETE" onClick={onDelete}>
            Delete
          </DeleteButton>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableToDo);
