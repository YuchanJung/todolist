import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  allToDosState,
  dateState,
  IAllToDos,
  IDate,
  returnDate,
  returnDateKey,
  TODOS_KEY,
} from "../atom";

const Wrapper = styled.div`
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

const DateSpan = styled.span`
  font-size: 20px;
`;

/*
function changeCat(category: Categories, direction: string) {
  const categories = Object.values(Categories);
  const date = new Date();
  const currentIndex = categories.findIndex((cat) => cat === category);
  console.log(date.toLocaleString("en-us", { month: "short" }));
  return direction === "left"
    ? categories[currentIndex - 1]
    : categories[currentIndex + 1];
}
*/

function changeDate(date: IDate, direction: string) {
  const today = new Date(date.year, date.month, date.day);
  const change = direction === "left" ? -1 : 1;
  const yesterday = new Date(today.setDate(today.getDate() + change));
  return returnDate(yesterday);
}

function SelectDate() {
  // const [category, setCategory] = useRecoilState(categoryState);
  const [date, setDate] = useRecoilState(dateState);
  const [allToDos, setAllToDos] = useRecoilState(allToDosState);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const direction = event.currentTarget.value;
    const changedDate = changeDate(date, direction);
    const dateKey = returnDateKey(changedDate);
    if (!allToDos[dateKey]) {
      setAllToDos((prevAllToDos) => {
        const newAllToDos: IAllToDos = {
          ...prevAllToDos,
          [dateKey]: { toDos: [] },
        };
        localStorage.setItem(TODOS_KEY, JSON.stringify(newAllToDos));
        return newAllToDos;
      });
    }
    setDate(changedDate);
  };
  return (
    <Wrapper>
      <LeftButton value="left" onClick={onClick}>
        <FontAwesomeIcon icon={faAngleLeft} className="angleLeft" />
      </LeftButton>
      <DateSpan>
        {monthNames[date.month]}&nbsp;&nbsp;{date.day}
      </DateSpan>
      <RightButton value="right" onClick={onClick}>
        <FontAwesomeIcon icon={faAngleRight} className="angleRight" />
      </RightButton>
    </Wrapper>
  );
}

export default SelectDate;
