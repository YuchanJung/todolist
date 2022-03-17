import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDosState } from "../atom";

const ToDoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  font-size: 24px;
  padding: 5px 2px;
`;

const ToDoInput = styled.input`
  :checked + label {
    color: #aeaeb1;
    text-decoration: line-through;
  }
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
      <button name="DELETE" onClick={onClick}>
        Delete
      </button>
    </ToDoContainer>
  );
}

export default ToDo;