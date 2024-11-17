import clsx from "clsx";

import styles from "./Title.module.scss";

const Title: React.FC<TitleProps> = (props) => {
  const { variant, className, children, isLowercase, align, color, style, customStyles, ...restProps } = props;

  const Heading = variant as keyof JSX.IntrinsicElements;
  return (
    <Heading
      className={clsx(
        styles.root,
        isLowercase && styles.lowercase,
        align && styles[align],
        style && styles[style],
        color && styles[color],
        className
      )}
      style={customStyles}
      data-testid="title"
      {...restProps}
    >
      {children}
    </Heading>
  );
};

Title.defaultProps = {
  variant: "h2",
  color: "white",
};

export type TitleProps = Omit<React.HTMLAttributes<any>, "style"> & {
  isLowercase?: boolean;
  className?: string;
  color?: "white" | "green" | "black";
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  style?: "normal" | "italic";
  customStyles?: React.CSSProperties;
};

export default Title;
