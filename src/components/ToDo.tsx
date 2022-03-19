import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDosState } from "../atom";

const ToDoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  height: 40px;
  font-size: 24px;
  padding: 5px 2px;
  margin: 4px;
`;

const ToDoInput = styled.input`
  margin-right: 10px;
  :checked + label {
    color: ${(props) => props.theme.cardShadowColor}; // have to change
    text-decoration: line-through;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  width: 65px;
  height: 30px;
  border-radius: 15px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.textColor};
`;

function ToDo({ text, category, id, checked }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDosState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as Categories, checked };
      // console.log(newToDo) -> error handling
      return name !== "DELETE"
        ? [
            ...oldToDos.slice(0, targetIndex),
            newToDo,
            ...oldToDos.slice(targetIndex + 1),
          ]
        : [
            ...oldToDos.slice(0, targetIndex),
            ...oldToDos.slice(targetIndex + 1),
          ];
    });
  };
  const onChange = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {text, id, category, checked: !checked}
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  }
  return (
    <ToDoContainer>
      <ToDoInput
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id + ""}
      />
      <label htmlFor={id + ""}>{text}</label>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <DeleteButton name="DELETE" onClick={onClick}>
        Delete
      </DeleteButton>
    </ToDoContainer>
  );
}

export default ToDo;