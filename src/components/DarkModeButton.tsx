import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { useSetRecoilState } from "recoil";
import { isDarkState } from '../atom';

const DarkModeBtn = styled.div`
  margin-right: 10px;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  &:checked + label div{
    transform: translateX(-24px);
  } 
`;

const Label = styled.label`
  position: relative;
  background-color: ${(props) => props.theme.cardShadowColor};
  transition: 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  height: 26px;
  width: 50px;
  border-radius: 50px;
  transform: scale(1.2);
`;

const ToggleBall = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: ${(props) => props.theme.cardBgColor};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  transition: 0.2s linear;
`;


function DarkModeButton () {
    const setIsDark = useSetRecoilState(isDarkState);
    const onChange = () => {
        setIsDark((prev) => !prev);
    }
    return (
      <DarkModeBtn>
        <Input
          type="checkbox"
          onChange={onChange}
          id="checkbox"
        />
        <Label htmlFor="checkbox">
          <FontAwesomeIcon icon={faMoon} className="fa-moon" />
          <FontAwesomeIcon icon={faSun} className="fa-sun" />
          <ToggleBall />
        </Label>
      </DarkModeBtn>
    );
}

export default DarkModeButton;