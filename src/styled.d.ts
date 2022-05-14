// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      basic: string;
      home: string;
      setting: string;
      createToDo: string;
      toDoWhileDragging: string;
      checkBox: string;
      ellpsisContents: string;
    };
    text: {
      basic: string;
      accent: string;
    };
    shadow: {
      frame: string;
    };
  }
}