import { useFormik } from "formik";
import React, { ReactNode } from "react";
import * as Yup from "yup";

import Close from "@mui/icons-material/Close";
import { IconButton, Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import useBreakpoint from "@hooks/useBreakpoint";
import { formatPrice } from "@utils/formatPrice";

import InputText from "@components/InputText";
import PricePercentage from "@components/PricePercentage";
import Text from "@components/Text";
import Title from "@components/Title";

import { CurrencyType } from "../../../types/CryptoType";
import styles from "./AlertModal.module.scss";

const AlertModal: React.FC<ModalProps> = (props) => {
  const { open, onClose, currency, onSubmit } = props;

  const isMobile = useBreakpoint({ max: "sm" });

  const validationSchema = Yup.object().shape({
    price: Yup.string().required("Target Price is required"),
    email: Yup.string().email("Invalid email id").required("Email is required"),
  });
  const initialValues = { price: "", email: "" };
  const { handleSubmit, errors, values, touched, isSubmitting, handleChange, handleBlur, isValid } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleClose = (event?: any, reason?: "backdropClick" | "escapeKeyDown") => {
    if (onClose) onClose(event, reason);
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
          <form onSubmit={handleSubmit}>
            <div className="flex column gap20">
              <div className="flex column gap10">
                <Text size={isMobile ? "xl" : "lg"} color="shade2">
                  Target Price
                </Text>
                <InputText
                  classes={{ root: "flex-auto" }}
                  error={touched.price ? errors.price : ""}
                  disabled={isSubmitting}
                  type="text"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Target Price"
                />
              </div>
              <div className="flex column gap10">
                <Text size={isMobile ? "xl" : "lg"} color="shade2">
                  Email
                </Text>
                <InputText
                  classes={{ root: "flex-auto" }}
                  error={touched.email ? errors.email : ""}
                  disabled={isSubmitting}
                  type="text"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Your Email"
                />
              </div>
              <button type="submit" className={styles.button} disabled={!isValid || isSubmitting}>
                Create Alert
                {isSubmitting && <CircularProgress size={20} className={styles.loading} />}
              </button>
            </div>
          </form>
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
  onSubmit: (values: any) => void;
};

export default AlertModal;
