import NextHead from "../components/NextHead";
import { HistoryPageComponent } from "../components/pages/History";

export default function History() {
  return (
    <>
      <NextHead
        title="PomoTasks"
        description=""
        ogImage="/images/pomotasks.png"
      />

      <HistoryPageComponent />
    </>
  );
}
