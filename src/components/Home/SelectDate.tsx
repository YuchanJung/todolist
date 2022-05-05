import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  allToDosState,
  dateState,
  IAllToDos,
  IDate,
  isBackState,
  returnDate,
  returnDateKey,
  TODOS_KEY,
} from "../../atom";
import Arrow from "../icons/Arrow";

const PREV = "left";
const NEXT = "right";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 40px;
  position: relative;
`;

const ChangeDateButton = styled.button`
  border: none;
  background-color: transparent;
`;

const PrevButton = styled(ChangeDateButton)`
  position: absolute;
  left: 5px;
`;

const NextButton = styled(ChangeDateButton)`
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

function returnChangedDate(date: IDate, direction: string) {
  const today = new Date(date.year, date.month, date.day);
  const change = direction === PREV ? -1 : 1;
  const yesterday = new Date(today.setDate(today.getDate() + change));
  return returnDate(yesterday);
}

function SelectDate() {
  // const [category, setCategory] = useRecoilState(categoryState);
  const [date, setDate] = useRecoilState(dateState);
  const [allToDos, setAllToDos] = useRecoilState(allToDosState);
  const setIsBack = useSetRecoilState(isBackState);
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
  const changeDate = (event: React.FormEvent<HTMLButtonElement>) => {
    const direction = event.currentTarget.value;
    const changedDate = returnChangedDate(date, direction);
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
    setIsBack(direction === PREV ? true : false);
    setDate(changedDate);
  };
  return (
    <Wrapper>
      <PrevButton value={PREV} onClick={changeDate}>
        <Arrow direction={PREV} className="prevDate" />
      </PrevButton>
      <DateSpan>
        {monthNames[date.month]}&nbsp;&nbsp;{date.day}
      </DateSpan>
      <NextButton value={NEXT} onClick={changeDate}>
        <Arrow direction={NEXT} className="nextDate" />
      </NextButton>
    </Wrapper>
  );
}

export default SelectDate;
