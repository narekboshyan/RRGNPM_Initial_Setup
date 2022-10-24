import React from 'react';
import GrayTooltipWithArrow from '../tooltip/GrayTooltipWithArrow';

const DisabledFieldTooltip = ({
  apply = false,
  statusTitle,
  children,
  title,
  placement = 'top',
  tooltipText = '',
  ...restProps
}) => {
  const tooltipTitle =
    tooltipText || `You can't make any changes when ${title} is ${statusTitle?.toLowerCase()}.`;

  return apply ? (
    <GrayTooltipWithArrow title={tooltipTitle} placement={placement} {...restProps}>
      {children}
    </GrayTooltipWithArrow>
  ) : (
    children
  );
};

export default DisabledFieldTooltip;
