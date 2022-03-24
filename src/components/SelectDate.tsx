import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState } from "../atom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0px 30px;
  position: relative;
`;

const ChangeDateButton = styled.button`
  border: none;
  background-color: transparent;
`;

const LeftButton = styled(ChangeDateButton)`
  position: absolute;
  left: 5px;
`;

const RightButton = styled(ChangeDateButton)`
  position: absolute;
  right: 5px;
`;

const CategorySpan = styled.span`
  font-size: 20px;
`;

function changeCat(category: Categories, direction: string) {
  const categories = Object.values(Categories);
  const currentIndex = categories.findIndex((cat) => cat === category);
  return direction === "left"
    ? categories[currentIndex - 1]
    : categories[currentIndex + 1];
}

function SelectDate() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const direction = event.currentTarget.value;
    setCategory(changeCat(category, direction));
  };
  return (
    <Container>
      {category !== Categories.DOING && (
        <LeftButton value="left" onClick={onClick}>
          <FontAwesomeIcon icon={faAngleLeft} className="angleLeft" />
        </LeftButton>
      )}
      <CategorySpan>{category}</CategorySpan>
      {category !== Categories.DONE && (
        <RightButton value="right" onClick={onClick}>
          <FontAwesomeIcon icon={faAngleRight} className="angleRight" />
        </RightButton>
      )}
    </Container>
  );
}

export default SelectDate;
