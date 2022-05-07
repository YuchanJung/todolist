import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IArrowProps {
  direction: string;
  className: string
}

function returnIcon(direction: string) {
  let icon: IconDefinition;
  if (direction === "left") icon = faAngleLeft;
  else if (direction === "right") icon = faAngleRight;
  else if (direction === "up") icon = faAngleUp;
  else icon = faAngleDown; // direction === "down"
  return icon;
}

function ArrowIcon({ direction, className }: IArrowProps) {
  const icon = returnIcon(direction);
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
    />
  );
}

export default ArrowIcon;
