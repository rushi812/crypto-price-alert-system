import React, { ReactNode, useState } from "react";

import Close from "@mui/icons-material/Close";
import { IconButton, Modal } from "@mui/material";

import useBreakpoint from "@hooks/useBreakpoint";
import { formatPrice } from "@utils/formatPrice";

import PricePercentage from "@components/PricePercentage";
import Text from "@components/Text";
import Title from "@components/Title";

import { CurrencyType } from "../../../types/CryptoType";
import styles from "./AlertModal.module.scss";

const AlertModal: React.FC<ModalProps> = (props) => {
  const [inputValue, setInputValue] = useState("");
  const { open, onClose, currency } = props;
  const isMobile = useBreakpoint({ max: "sm" });

  const handleClose = (event?: any, reason?: "backdropClick" | "escapeKeyDown") => {
    if (onClose) onClose(event, reason);
  };

  const handleCreateAlert = () => {
    console.log("RB:: Target Price", inputValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{ backdrop: { timeout: 500, className: styles.backdrop } }}
      closeAfterTransition
    >
      <>
        <div className={styles.root}>
          <header className={styles.header}>
            <div className="flex align-center justify-between">
              <div>
                <Title variant={isMobile ? "h2" : "h1"}>{currency.name}</Title>
                <div className="flex align-center gap5">
                  <Text color="grey" size="lg">
                    {formatPrice(currency.current_price)}
                  </Text>
                  <PricePercentage price={currency.price_change_percentage_1h_in_currency} />
                </div>
              </div>
              <IconButton onClick={onClose} color="primary">
                <Close sx={{ fontSize: "2.5rem" }} />
              </IconButton>
            </div>
          </header>
          <div className="relative">
            <div className="flex column gap10">
              <Text size={isMobile ? "xl" : "lg"}>Target Price</Text>
              <input
                value={inputValue}
                className={styles.priceInput}
                placeholder="Enter Target Price"
                autoFocus
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <button className={styles.button} onClick={handleCreateAlert} disabled={!inputValue}>
              Create Alert
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export type ModalProps = {
  open: boolean;
  onClose?: (event?: any, reason?: "backdropClick" | "escapeKeyDown") => any;
  actions?: ReactNode;
  currency: CurrencyType;
};

export default AlertModal;
