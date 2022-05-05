import styled from "styled-components";
import Arrow from "../icons/Arrow";

const Wrapper = styled.div`
  width: 30px;
  height: 40px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function DragButton() {
  return (
    <Wrapper>
      <Arrow direction="up" className="dragUp" />
      <Arrow direction="down" className="dragDown" />
    </Wrapper>
  );
}

export default DragButton;
