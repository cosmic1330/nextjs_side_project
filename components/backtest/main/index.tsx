import { Form } from "react-final-form";
import Title from "./title";
import DialogForm from "./form";
import Pages from "./pages";
import { memo } from "react";
export default memo(function Main() {
  return (
    <main>
      <Form
        onSubmit={() => {}}
        initialValues={{
          type: "once",
          lowestHandlingFee: 20,
          highestLoss: 15,
          handlingFeeRebate: 65,
          capital: 300000,
          hightStockPrice: 100,
        }}
        render={() => (
          <main>
            <Title />
            <Pages />
            <DialogForm />
          </main>
        )}
      />
    </main>
  );
});
