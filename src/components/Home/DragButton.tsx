import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import Arrow from "../icons/Arrow";

const Wrapper = styled(motion.div)`
  width: 30px;
  height: 40px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
`;

const wrapperVariants: Variants = {
  hover: { opacity: 1 },
  click: { scale: 0.9, opacity: 1 },
};

function DragButton() {
  return (
    <Wrapper variants={wrapperVariants} whileHover="hover" whileTap="click">
      <Arrow direction="up" className="dragUp" />
      <Arrow direction="down" className="dragDown" />
    </Wrapper>
  );
}

export default DragButton;

/*
Error occurs when a component has props of Framer-Motion and React-Beautiful-Dnd together. 
So, I create "DragBox", "DragButton" components separately
DragBox for dnd props(provided)
DragButton for framer-motion
*/ 
