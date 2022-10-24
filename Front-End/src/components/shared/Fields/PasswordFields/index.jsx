import React, { useState } from "react";
import { ReactComponent as HiddenPass } from "assets/icons/password_hidden_blue_icon_32.svg";
import { ReactComponent as VisiblePass } from "assets/icons/password_visible_blue_icon_32.svg";
import IconButton from "components/shared/Button/IconButton";
import TextField from "../TextField";

const PasswordField = React.forwardRef(
  ({ InputProps = {}, ...restProps }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
      <TextField
        ref={ref}
        type={isShowPassword ? "text" : "password"}
        InputProps={{
          endAdornment: isShowPassword ? (
            <IconButton
              onClick={() => setIsShowPassword(false)}
              icon={<VisiblePass />}
            />
          ) : (
            <IconButton
              onClick={() => setIsShowPassword(true)}
              icon={<HiddenPass />}
            />
          ),
          ...InputProps,
        }}
        {...restProps}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
