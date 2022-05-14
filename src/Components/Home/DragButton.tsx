import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import ArrowIcon from "../Icons/ArrowIcon";

const Wrapper = styled(motion.div)`
  width: 40px;
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
      <ArrowIcon direction="up" className="dragUp" />
      <ArrowIcon direction="down" className="dragDown" />
    </Wrapper>
  );
}

export default DragButton;

/*
Error occurs when a component has props of Framer-Motion and React-Beautiful-Dnd together. 
So, I create "DragBox", "DragButton" components separately (DragButton.tsx in DragBox of ToDo.tsx)
DragBox for dnd props(provided)
DragButton for framer-motion
*/ 
