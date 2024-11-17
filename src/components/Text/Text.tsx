import clsx from "clsx";

import styles from "./Text.module.scss";

const Text: React.FC<TextProps> = (props) => {
  const { variant, className, children, color, weight, size, align, style, ...rest } = props;

  const Content = variant as keyof JSX.IntrinsicElements;

  return (
    <Content
      {...rest}
      className={clsx(
        styles.root,
        color && styles[color],
        weight && styles[weight],
        size && styles[size],
        align && styles[align],
        style && styles[style],
        className
      )}
      data-testid="text"
    >
      {children}
    </Content>
  );
};

Text.defaultProps = {
  variant: "p",
  color: "white",
  weight: "normal",
  size: "md",
  style: "normal",
};

export type TextProps = React.HTMLAttributes<any> & {
  color?: "white" | "green" | "$lightgreen" | "red" | "black" | "shade" | "shade2" | "grey";
  weight?: "normal" | "medium" | "bold" | "heavy";
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "left" | "center" | "right" | "justify";
  style?: "normal" | "italic";
  variant?: keyof JSX.IntrinsicElements;
};

export default Text;
