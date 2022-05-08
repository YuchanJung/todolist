// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    homeBgColor: string;
    frameShadowColor: string;
    settingBgColor: string;
    checkBoxColor: string;
    whileDraggingColor: string;
  }
}