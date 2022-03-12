import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDosSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoContainer = styled.div`
  display: flex;
  div {
    text-align: center;
    width: 250px;
  }
`;

function ToDoList() {
  const [toDoList, doingList, doneList] = useRecoilValue(toDosSelector);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ToDoContainer>
        <div>
          <h2>To Do</h2>
          <ul>
            {toDoList.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
              // <ToDo text={toDo.text} id={toDo.id} category={toDo.category}/>
            ))}
          </ul>
        </div>
        <div>
          <h2>Doing</h2>
          <ul>
            {doingList.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </div>
        <div>
          <h2>Done</h2>
          <ul>
            {doneList.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </div>
      </ToDoContainer>
    </div>
  );
}

export default ToDoList;
