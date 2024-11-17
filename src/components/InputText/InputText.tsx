import clsx from "clsx";

import styles from "./InputText.module.scss";

const InputText: React.FC<InputTextProps> = (props) => {
  const { children, type, variant, error, className, classes, ...rest } = props;

  return (
    <div className={clsx(styles.root, classes?.root)} data-testid="input-text">
      <input
        type={type}
        className={clsx(styles.input, variant && styles[variant], error && styles.error, className)}
        {...rest}
      />
      {error && error.length ? <p className={clsx(styles.errorText, classes?.error)}>{error}</p> : null}
      {children}
    </div>
  );
};

InputText.defaultProps = {
  variant: "normal",
  type: "text",
  classes: {},
};

export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "normal" | "rounded";
  error?: string;
  classes?: { error?: string; root?: string };
};

export default InputText;
