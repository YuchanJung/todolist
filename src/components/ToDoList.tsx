import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDosSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import SelectCategory from "./SelectCategory";
import ToDo from "./ToDo";

const Container = styled.div`
  width: 380px;
  height: 500px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: -2px 4px 20px 4px ${(props) => props.theme.cardShadowColor};
`;

const Header = styled.header`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 90%;
  font-family: 'Roboto Slab', serif;
  font-size: 42px;
  margin: 15px 5px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function WholeList() {
  const toDos = useRecoilValue(toDosSelector);
  console.log(toDos);
  return (
    <Container>
      <Header>
        <Title>{toDos.length} Tasks</Title>
        <CreateToDo />
      </Header>
      <hr />
      <SelectCategory />
      <Body>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Body>
    </Container>
  );
}

export default WholeList;
