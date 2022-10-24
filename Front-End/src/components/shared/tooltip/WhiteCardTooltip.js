import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import { WHITE_COLOR, GRAY_COLOR } from "constants/index";

const useStyles = makeStyles({
  whiteTooltip: {
    backgroundColor: WHITE_COLOR,
    border: `1px solid ${GRAY_COLOR}`,
    boxShadow: "0px 4px 4px rgba(8, 35, 48, 0.12)",
    borderRadius: 10,
    padding: 16,
    width: ({ width }) => width || "unset",
  },
});
const WhiteCardTooltip = ({
  title = "",
  children,
  classes = {},
  width,
  ...rest
}) => {
  const { tooltip: tooltipClassName = "", ...classesRest } = classes;
  const styles = useStyles({ width });
  return (
    <Tooltip
      title={title}
      classes={{
        tooltip: clsx(styles.whiteTooltip, {
          [tooltipClassName]: tooltipClassName,
        }),
        ...classesRest,
      }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default WhiteCardTooltip;
