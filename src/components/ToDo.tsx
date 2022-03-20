import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDosState, TODOS_KEY } from "../atom";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  height: 40px;
  font-size: 24px;
  padding: 5px 2px;
  margin: 4px;
`;

const Input = styled.input`
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
  const setToDos = useSetRecoilState(toDosState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      let newToDos = [];
      if (name === "DELETE") {
        newToDos = [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      } else {
        const newToDo = { text, id, category: name as Categories, checked };
        newToDos = [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
      localStorage.setItem(TODOS_KEY, JSON.stringify(newToDos));
      return newToDos;
    });
  };
  const onChange = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category, checked: !checked };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem(TODOS_KEY, JSON.stringify(newToDos));
      return newToDos;
    });
  };
  return (
    <Container>
      <Input
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
    </Container>
  );
}

export default ToDo;
