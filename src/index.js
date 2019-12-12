import React from "react";
import { render } from "react-dom";
import cx from "classnames";

import styles from "./styles.scss";

const BASE_CLASS = "app";

console.log(styles);

const App = () => {
  return (
    <div className={cx(styles.margin_xs, styles.paddingRight_l)}>
      <span>main Text with margin around it</span>
    </div>
  );
};

render(<App />, document.getElementById("app"));
