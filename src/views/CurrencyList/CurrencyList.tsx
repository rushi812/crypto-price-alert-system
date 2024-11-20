import clsx from "clsx";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Col, Row } from "react-grid-system";

import CircularProgress from "@mui/material/CircularProgress";

import { useCryptoCurrencyList } from "@api/Crypto";
import { fetchAPI } from "@api/helpers";
import { formatPrice } from "@utils/formatPrice";

import Image from "@components/Image";
import PricePercentage from "@components/PricePercentage";
import Text from "@components/Text";

import { CurrencyType } from "../../types/CryptoType";
import AlertModal from "./AlertModal";
import styles from "./CurrencyList.module.scss";

const CurrencyList: React.FC<CurrencyListProps> = () => {
  const [alertModal, setAlertModal] = useState<CurrencyType>();
  const { enqueueSnackbar } = useSnackbar();
  const { data: currencyList, isLoading } = useCryptoCurrencyList();

  const handlePriceAlert = (currency: CurrencyType) => {
    setAlertModal(currency);
  };

  const handleSubmit = (values: any) => {
    return fetchAPI("/api/subscriptions", { method: "POST", body: JSON.stringify(values) })
      .then(() => {
        setAlertModal(undefined);
        enqueueSnackbar("Alert Subscription Successful!", { variant: "success" });
      })
      .catch((e) => enqueueSnackbar(e.message, { variant: "error" }));
  };

  const renderTableHeader = () => (
    <Row gutterWidth={0} align="center" wrap="nowrap">
      <Col xs={1.5} md={1}>
        <Text align="right" weight="heavy" className={styles.headerCell}>
          #
        </Text>
      </Col>
      <Col xs={4} md={1.5}>
        <Text weight="heavy" className={styles.headerCell}>
          Coin
        </Text>
      </Col>
      <Col xs={3} md={1}>
        <Text align="right" weight="heavy" className={styles.headerCell}>
          Price
        </Text>
      </Col>
      <Col xs={3} md={1}>
        <Text align="right" weight="heavy" className={styles.headerCell}>
          1h
        </Text>
      </Col>
      <Col xs={3} md={1}>
        <Text align="right" weight="heavy" className={styles.headerCell}>
          24h
        </Text>
      </Col>
      <Col xs={3} md={1}>
        <Text align="right" weight="heavy" className={styles.headerCell}>
          7d
        </Text>
      </Col>
      <Col xs={5} md={2}>
        <Text align="right" weight="heavy" className={styles.headerCell}>
          24h Volume
        </Text>
      </Col>
      <Col xs={5} md={2}>
        <Text align="right" weight="heavy" className={styles.headerCell}>
          Market Cap
        </Text>
      </Col>
      <Col xs={4} md={1.5} className={styles.headerCell}></Col>
    </Row>
  );

  const renderCoinInfo = (currency: CurrencyType) => (
    <div className={clsx(styles.bodyCell, "justify-start gap10")}>
      <div className={styles.coinImage}>
        <Image src={currency.image} alt={currency.name} fill objectFit="contain" />
      </div>
      <div>
        <Text weight="heavy">{currency.name}</Text>
        <Text color="grey">{currency.symbol.toUpperCase()}</Text>
      </div>
    </div>
  );

  const renderTableBody = () =>
    currencyList?.map((currency, index) => {
      const {
        id,
        current_price,
        price_change_percentage_1h_in_currency,
        price_change_percentage_7d_in_currency,
        price_change_percentage_24h_in_currency,
        total_volume,
        market_cap,
      } = currency;
      return (
        <Row key={id} gutterWidth={0} align="center" wrap="nowrap" className={styles.row}>
          <Col xs={1.5} md={1}>
            <Text align="right" className={styles.bodyCell}>
              {index + 1}
            </Text>
          </Col>
          <Col xs={5} md={1.5}>
            {renderCoinInfo(currency)}
          </Col>
          <Col xs={3} md={1}>
            <Text align="right" className={styles.bodyCell}>
              {formatPrice(current_price)}
            </Text>
          </Col>
          <Col xs={3} md={1}>
            <Text align="right" className={styles.bodyCell}>
              <PricePercentage price={price_change_percentage_1h_in_currency} />
            </Text>
          </Col>
          <Col xs={3} md={1}>
            <Text align="right" className={styles.bodyCell}>
              <PricePercentage price={price_change_percentage_24h_in_currency} />
            </Text>
          </Col>
          <Col xs={3} md={1}>
            <Text align="right" className={styles.bodyCell}>
              <PricePercentage price={price_change_percentage_7d_in_currency} />
            </Text>
          </Col>
          <Col xs={5} md={2}>
            <Text align="right" className={styles.bodyCell}>
              {formatPrice(total_volume)}
            </Text>
          </Col>
          <Col xs={5} md={2}>
            <Text align="right" className={styles.bodyCell}>
              {formatPrice(market_cap)}
            </Text>
          </Col>
          <Col xs={3} md={1.5}>
            <div className={styles.bodyCell}>
              <button className={styles.alert} onClick={handlePriceAlert.bind(this, currency)}>
                Create Alert
              </button>
            </div>
          </Col>
        </Row>
      );
    });

  if (isLoading)
    return (
      <div className={styles.loader}>
        <CircularProgress size="8rem" color="success" />
      </div>
    );

  return (
    <>
      <div className="scroll-grid">
        {renderTableHeader()}
        {renderTableBody()}
      </div>
      {!!alertModal && (
        <AlertModal open onClose={() => setAlertModal(undefined)} currency={alertModal} onSubmit={handleSubmit} />
      )}
    </>
  );
};

type CurrencyListProps = {};

export default CurrencyList;
