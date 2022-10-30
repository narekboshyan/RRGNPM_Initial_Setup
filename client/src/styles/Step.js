import { makeStyles } from "@material-ui/core/styles";
import { MOBILE_LAYOUT_CONTAINER_PADDING, DESKTOP_LAYOUT_CONTAINER_PADDING } from "constants/index";
import { GRAY_COLOR, DARK_BLUE_COLOR } from "constants/index";

export const useStepStyles = makeStyles(
  {
    stepCard: {
      overflow: "hidden",
    },
    stepRoot: {
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "stretch",
    },
    stepHeader: {
      display: "flex",
      borderBottom: `1px solid ${GRAY_COLOR}`,
      padding: ({ applyMobileLayout }) =>
        applyMobileLayout
          ? MOBILE_LAYOUT_CONTAINER_PADDING
          : `${MOBILE_LAYOUT_CONTAINER_PADDING}px ${DESKTOP_LAYOUT_CONTAINER_PADDING}px`,
      alignItems: "center",
    },
    stepHeaderActionsWrapper: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    stepTitle: {
      flex: 1,
      fontWeight: 500,
      fontSize: 20,
      lineHeight: "28px",
      color: DARK_BLUE_COLOR,
      paddingRight: 10,
    },
    stepBody: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      overflowY: "auto",
      overflowX: "hidden",
      flex: 1,
      position: "relative",
      scrollBehavior: "smooth",
    },
    stepFooterActions: {
      padding: ({ applyMobileLayout }) =>
        applyMobileLayout ? MOBILE_LAYOUT_CONTAINER_PADDING : DESKTOP_LAYOUT_CONTAINER_PADDING,
      display: "flex",
      justifyContent: "flex-end",
      borderTop: `1px solid ${GRAY_COLOR}`,
      backgroundColor: ({ footerBgColor }) => footerBgColor || "transparent",
      borderRadius: "0 0 15px 15px",
    },
    stepHeaderExtra: {
      justifyContent: "space-between",
    },
    stepBodyExtra: {
      padding: ({ applyMobileLayout }) =>
        applyMobileLayout
          ? `${DESKTOP_LAYOUT_CONTAINER_PADDING}px ${MOBILE_LAYOUT_CONTAINER_PADDING}px`
          : DESKTOP_LAYOUT_CONTAINER_PADDING,
    },
    stepFooterExtra: {
      paddingTop: `${MOBILE_LAYOUT_CONTAINER_PADDING}px !important`,
      paddingBottom: `${MOBILE_LAYOUT_CONTAINER_PADDING}px !important`,
    },
    defaultActionButtun: {
      marginLeft: 20,
      minWidth: 200,
      paddingRight: 24,
      paddingLeft: 24,
      paddingTop: 8,
      paddingBottom: 8,
    },
    stepParagraph: {
      wordBreak: "break-word",
      marginTop: 16,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.25px",
      color: DARK_BLUE_COLOR,
    },
  },
  { index: 1 }
);
