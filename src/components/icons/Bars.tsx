import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import { showingBarState } from "../../atom";

function Bars() {
    const setShowingBar = useSetRecoilState(showingBarState);
    return (
      <FontAwesomeIcon
        onClick={() => setShowingBar((prev) => !prev)}
        icon={faBars}
        className="bars"
      />
    );
}

export default Bars;