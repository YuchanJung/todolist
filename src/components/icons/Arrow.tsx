import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IArrowProps {
  direction: boolean;
  className: string
}

function Arrow({ direction, className }: IArrowProps) {
  return (
    <FontAwesomeIcon
      icon={direction ? faAngleLeft : faAngleRight}
      className={className}
    />
  );
}

export default Arrow;
