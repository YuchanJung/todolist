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

export function returnDateKey ({month, day, year} : IDate) {
  const key = month.toString() + day.toString() + year.toString();
  return Number(key);
}

export function returnDate(date: Date) {
  return {
    month: date.getMonth(), //date.toLocaleString("en-us", { month: "short" }),
    day: date.getDate(),
    year: date.getFullYear(),
  };
}

export interface IToDos {
  [date: number] : {
    toDos: IToDo[];
  }
}
  
export const TODOS_KEY = "toDos";
export const ISDARK_KEY = "isDark";

export const isDarkState = atom({
  key: "isDark",
  default: false,
});

export const toDosState = atom<IToDos>({
  key: "toDosTest",
  default: { [returnDateKey({ ...returnDate(new Date()) })]: { toDos: [] } },
});

export const dateState = atom<IDate>({
  key: "date",
  default: returnDate(new Date()),
})

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

/*
export const toDosCatSelector = selector({
  key: "toDosCatSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});


export const toDosDateSelector = selector<IToDo[]>({
  key: "toDosDateSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const date = get(dateState);
    return toDos.filter(
      (toDo) =>
        toDo.date.day === date.day &&
        toDo.date.month === date.month &&
        toDo.date.year === date.year
    );
  },
});
*/