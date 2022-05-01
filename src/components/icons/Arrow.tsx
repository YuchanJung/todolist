import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import { showingBarState } from "../../atom";

interface IArrowProps {
  direction: boolean;
  className: string
}

function Arrow({ direction, className }: IArrowProps) {
  const setShowingBar = useSetRecoilState(showingBarState);
  return (
    <FontAwesomeIcon
      onClick={() => setShowingBar((prev) => !prev)}
      icon={direction ? faAngleLeft : faAngleRight}
      className={className}
    />
  );
}

export default Arrow;
