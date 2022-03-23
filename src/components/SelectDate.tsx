import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState } from "../atom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin: 0px 30px;
`;

function SelectDate() {
  const [category, setCategory] = useRecoilState(categoryState);
  return (
    <Container>
      {category !== Categories.DOING && (
        <FontAwesomeIcon icon={faAngleLeft} className="angleLeft" />
      )}
      <span>{category}</span>
      {category !== Categories.DONE && (
        <FontAwesomeIcon icon={faAngleRight} className="angleRight" />
      )}
    </Container>
  );
}

export default SelectDate;
