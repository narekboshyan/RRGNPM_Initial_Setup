import React from "react";
import Field from "../Field";

const FIELD_TYPE = {
  text: "text",
  search: "search",
  select: "select",
};

const TextField = React.forwardRef((props, ref) => {
  return <Field ref={ref} fieldType={FIELD_TYPE.text} {...props} />;
});

TextField.displayName = "TextField";

export default TextField;
