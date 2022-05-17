import { motion, Variants } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { showingEllipsisModalState, showingSettingPageState } from "../../atom";

const ContainerOverlay = styled.div`
  width: 380px;
  min-width: 380px;
  height: 500px;
  position: absolute;
  opacity: 0;
`;

const HomeOverlay = styled(motion.div)`
  width: 380px;
  min-width: 380px;
  height: 500px;
  border-radius: 35px;
  background-color: ${(props) => props.theme.background.home};
  position: absolute;
`;

const homeOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 0.6,
    transition: {
      duration: 0.5,
    },
  },
};

function Overlay() {
  const [showingSettingPage, setShowingSettingPage] = useRecoilState(
    showingSettingPageState
  );
  const [showingEllipsisModal, setShowingEllipsisModal] = useRecoilState(
    showingEllipsisModalState
  );
  const toggleSettingPage = () => setShowingSettingPage((prev) => !prev);
  const toggleEllipsisModal = () => setShowingEllipsisModal((prev) => !prev);
  return (
    <>
      {showingSettingPage && (
        <HomeOverlay
          onClick={toggleSettingPage}
          variants={homeOverlayVariants}
          initial="hidden"
          animate="visible"
        />
      )}
      {showingEllipsisModal && (
        <ContainerOverlay onClick={toggleEllipsisModal} />
      )}
    </>
  );
}

export default Overlay;
