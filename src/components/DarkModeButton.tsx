import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const DarkModeBtn = styled.div`
    
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  height: 26px;
  width: 50px;
  border-radius: 50px;
`;

const ToggleBall = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: ${(props) => props.theme.bgColor};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  transition: 0.2s linear;
`;


function DarkModeButton () {
    return (
      <DarkModeBtn>
        <Input type="checkbox" id="checkbox" />
        <Label htmlFor="checkbox">
          <FontAwesomeIcon icon={faMoon} className="fa-moon"/>
          <FontAwesomeIcon icon={faSun} className="fa-sun" />
          <ToggleBall />
        </Label>
      </DarkModeBtn>
    );
}

export default DarkModeButton;