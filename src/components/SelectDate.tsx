import { faAngleLeft, faAngleRight, faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, dateState, IDate, IToDos, returnDate, returnDateKey, toDosState, TODOS_KEY } from "../atom";

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
  const [totalToDos, setTotalToDos] = useRecoilState(toDosState);
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
    const dateChanged = changeDate(date, direction);
    const dateKey = returnDateKey(dateChanged);
    if (!totalToDos[dateKey]) {
      setTotalToDos(prev => {
        const totalToDos: IToDos = { ...prev, [dateKey]: { toDos: [] } };
        localStorage.setItem(TODOS_KEY, JSON.stringify(totalToDos));
        return totalToDos;
      })
    }
    setDate(dateChanged);
  };
  return (
    <Container>
      <LeftButton value="left" onClick={onClick}>
        <FontAwesomeIcon icon={faAngleLeft} className="angleLeft" />
      </LeftButton>
      <DateSpan>{monthNames[date.month]}&nbsp;&nbsp;{date.day}</DateSpan>
      <RightButton value="right" onClick={onClick}>
        <FontAwesomeIcon icon={faAngleRight} className="angleRight" />
      </RightButton>
    </Container>
  );
}

export default SelectDate;
