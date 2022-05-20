// https://www.market-me.fr/barni-media
import { BackTestThemeProvider } from "../../components/backtest/theme";
import Head from "next/head";
import Loading from "../../components/backtest/loading";
import Header from "../../components/backtest/header";
import Main from "../../components/backtest/main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useWorkerStockData from "../../components/backtest/hooks/useWorkerStockData";
import useStockIds from "../../components/backtest/hooks/useStockIds";
import { useEffect } from "react";
import { AppWrapper } from "../../context/backtest";
import { Form } from "react-final-form";


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "backtest"])),
    },
  };
}

export default function Backtest() {
  const ids = useStockIds();
  return (
    <AppWrapper>
      <Content {...{ ids }} />
    </AppWrapper>
  );
}

function Content({ ids }) {
  const { set, stockData } = useWorkerStockData();

  useEffect(() => {
    if (Object.keys(stockData).length === 0) set(ids);
  }, [ids]);

  return (
    <BackTestThemeProvider>
      <Head>
        <link href={`font-family/font.css`} rel="preload" as="style" />
      </Head>
      <Loading
        {...{
          disabled: ids.length !== 0 ? false : true,
        }}
      />

      <Form
        onSubmit={() => { }}
        initialValues={{
          type: "once",
          lowestHandlingFee: 20,
          highestLoss: 15,
          handlingFeeRebate: 65,
          capital: 300000,
          hightStockPrice: 100,
          justBuy: "random",
        }}
        render={() => (
          <form>
            <Header />
            <Main {...{ set }} />
          </form>
        )}
      />
    </BackTestThemeProvider>
  );
}
