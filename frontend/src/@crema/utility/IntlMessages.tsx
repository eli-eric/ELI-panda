import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

const InjectMassage = (props: any) => <FormattedMessage {...props} />;
export default injectIntl(InjectMassage, {
  forwardRef: false,
});
