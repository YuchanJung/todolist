import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  background: {
    basic: "#191919",
    home: "rgb(32, 32, 32)",
    setting: "rgb(39, 39, 39)",
    toDoWhileDragging: "rgb(75, 75, 75)",
    checkBox: "#9aacb6", // #A6B8C4 or #9aacb6
    ellpsisContents: "rgb(45, 45, 45)",
  },
  text: {
    basic: "white",
    accent: "#B0B6B7",
  },
  shadow: {
    frame: "#161618",
  },
};

export const lightTheme: DefaultTheme = {
  background: {
    basic: "#F7F8FB",
    home: "white",
    setting: "rgb(226, 230, 230)",
    toDoWhileDragging: "rgb(242, 242, 240)",
    checkBox: "#3c6382",
    ellpsisContents: "white",
  },
  text: {
    basic: "black",
    accent: "#bdc3c7",
  },
  shadow: {
    frame: "#bdc3c7",
  },
};
