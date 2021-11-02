import { useRouter } from "next/router";
import { AppContainer } from "../../styles/containers";
import { appTabs } from "../../data/appTabs";

import * as S from "./styles";

const AppCard: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <AppContainer>
      <S.AppCardContainer>
        <S.Header>
          {appTabs.map((tab) => (
            <S.Tab
              key={tab.url}
              active={router.pathname === tab.url}
              onClick={() => router.push(tab.url)}
            >
              <S.TabLink href={tab.url}>{tab.title}</S.TabLink>
            </S.Tab>
          ))}
        </S.Header>

        {children}
      </S.AppCardContainer>
    </AppContainer>
  );
};

export default AppCard;
