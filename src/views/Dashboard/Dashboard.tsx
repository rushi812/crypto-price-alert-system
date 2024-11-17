import useBreakpoint from "@hooks/useBreakpoint";

import { Container } from "@components/Grid";
import Title from "@components/Title";
import CurrencyList from "@views/CurrencyList";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const isMobile = useBreakpoint({ max: "sm" });

  return (
    <Container className="mv30">
      <Title variant={isMobile ? "h2" : "h1"} className="mb20">
        Cryptocurrency Prices by Market Cap
      </Title>
      <CurrencyList />
    </Container>
  );
};

export default Dashboard;
