import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { isDarkState } from './atom';
import ToDoList from './components/ToDoList';
import Globalstyle from './styles/globalStyle';
import { darkTheme, lightTheme } from './theme';

function App() {
  const isDark = useRecoilValue(isDarkState);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Globalstyle />
        <ToDoList />
      </ThemeProvider>
    </>
  );
}

export default App;
