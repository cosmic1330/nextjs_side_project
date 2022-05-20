import Title from "./title";
import Pages from "./pages";
import { memo } from "react";
export default memo(function Main() {
  return (
    <main>
      <Title />
      <Pages />
    </main>
  );
});
