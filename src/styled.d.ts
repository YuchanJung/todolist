// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: stirng;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
    cardShadowColor: string;
    settingBgColor: string;
    checkColor: string; // check icon color
    checkBoxColor: string;
  }
}