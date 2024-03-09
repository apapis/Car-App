import styled from "styled-components";
import Spinner from "../Loading/Spinner";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingOverlay: React.FC = () => {
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
};

export default LoadingOverlay;
