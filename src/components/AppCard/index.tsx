import { AppContainer } from "../../styles/containers";
import { AppCardContainer } from "./styles";

const AppCard: React.FC = ({ children }) => {
  return (
    <AppContainer>
      <AppCardContainer>{children}</AppCardContainer>
    </AppContainer>
  );
};

export default AppCard;
