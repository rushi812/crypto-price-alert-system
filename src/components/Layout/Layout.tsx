import clsx from "clsx";

import CircularProgress from "@mui/material/CircularProgress";

import useBreakpoint from "@hooks/useBreakpoint";

import styles from "./Layout.module.scss";

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, classes, loading } = props;

  const isMobile = useBreakpoint({ max: "sm" });

  return (
    <div>
      <div className={clsx(styles.root, classes?.root)}>
        <main className={clsx(styles.main, classes?.main)}>
          {loading ? <CircularProgress size="3rem" /> : children}
        </main>
      </div>
    </div>
  );
};

type LayoutProps = React.PropsWithChildren<{
  classes?: { root?: string; main?: string };
  loading?: boolean;
}>;

export default Layout;
