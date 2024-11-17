import clsx from "clsx";

import styles from "./Container.module.scss";

const Container: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={clsx(styles.container, className)} {...props}>
    {children}
  </div>
);

export default Container;
