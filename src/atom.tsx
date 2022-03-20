import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
  checked: boolean;
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

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDosSelector = selector({
  key: "toDosSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});