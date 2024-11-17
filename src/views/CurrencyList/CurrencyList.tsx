import clsx from "clsx";
import React from "react";
import { Col, Row } from "react-grid-system";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { useCryptoCurrencyList } from "@api/Crypto";
import { formatPrice } from "@utils/formatPrice";

import Image from "@components/Image";
import Text from "@components/Text";

import { CurrencyType } from "../../types/CryptoType";
import styles from "./CurrencyList.module.scss";

const CurrencyList: React.FC<CurrencyListProps> = () => {
  const { data: currencyList } = useCryptoCurrencyList();

  const handlePriceAlert = (currency: CurrencyType) => {
    console.log("RB:: Price Alert for:", currency.name);
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
      <Col xs={4} md={1.5} className={styles.headerCell}></Col>
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

  const renderPercentage = (value: number) => {
    if (value > 0)
      return (
        <div className="flex align-center justify-end">
          <ArrowDropUpIcon sx={{ color: "#32ca5b", fontSize: 20 }} />
          <Text color="green">{`${value.toFixed(2)}%`}</Text>
        </div>
      );
    return (
      <div className="flex align-center justify-end">
        <ArrowDropDownIcon sx={{ color: "#ff3a33", fontSize: 20 }} />
        <Text color="red">{`${value.toFixed(2).replace("-", "")}%`}</Text>
      </div>
    );
  };

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
          <Col xs={3} md={1.5}>
            <div className={styles.bodyCell}>
              <button className={styles.alert} onClick={handlePriceAlert.bind(this, currency)}>
                Create Alert
              </button>
            </div>
          </Col>
          <Col xs={3} md={1}>
            <Text align="right" className={styles.bodyCell}>
              {formatPrice(current_price)}
            </Text>
          </Col>
          <Col xs={3} md={1}>
            <Text align="right" className={styles.bodyCell}>
              {renderPercentage(price_change_percentage_1h_in_currency)}
            </Text>
          </Col>
          <Col xs={3} md={1}>
            <Text align="right" className={styles.bodyCell}>
              {renderPercentage(price_change_percentage_24h_in_currency)}
            </Text>
          </Col>
          <Col xs={3} md={1}>
            <Text align="right" className={styles.bodyCell}>
              {renderPercentage(price_change_percentage_7d_in_currency)}
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
        </Row>
      );
    });

  return (
    <div className="scroll-grid">
      {renderTableHeader()}
      {renderTableBody()}
    </div>
  );
};

type CurrencyListProps = {};

export default CurrencyList;
