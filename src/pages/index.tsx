import NextHead from "../components/NextHead";
import { HomeComponentPage } from "../components/pages/Home";

export default function Home() {
  return (
    <>
      <NextHead
        title="PomoTasks"
        description=""
        ogImage="/images/pomotasks.png"
      />

      <HomeComponentPage />
    </>
  );
}
