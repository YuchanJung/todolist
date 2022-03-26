import { atom, selector } from "recoil";

export enum Categories {
  DOING = "DOING",
  TO_DO = "TO DO",
  DONE = "DONE",
}

export interface IDate {
  month: number;
  day: number;
  year: number;
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
  checked: boolean;
  date: IDate;
}
  
export const TODOS_KEY = "toDos";
export const ISDARK_KEY = "isDark";

export const isDarkState = atom({
  key: "isDark",
  default: false,
});

export const toDosState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export function returnDate(date: Date) {
  const returnDate: IDate = {
    month: date.getMonth(),//date.toLocaleString("en-us", { month: "short" }),
    day: date.getDate(),
    year: date.getFullYear(),
  };
  return returnDate;
}

export const dateState = atom<IDate>({
  key: "date",
  default: returnDate(new Date()),
})

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDosCatSelector = selector({
  key: "toDosCatSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const toDosDateSelector = selector({
  key: "toDosDateSelector",
  get: ({get}) => {
    const toDos = get(toDosState);
    const date = get(dateState);
    return toDos.filter(
      (toDo) =>
        toDo.date.day === date.day &&
        toDo.date.month === date.month &&
        toDo.date.year === date.year
    );
  }
})