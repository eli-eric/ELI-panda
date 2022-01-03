import React from "react";
import { connect } from "react-redux";
import { actions as appActions } from "./reducer";

import { ColorChangeHandler, SketchPicker } from "react-color";

interface WithReduxProps {
  onChangeColor: ColorChangeHandler;
  color?: string;
}

const WithRedux: React.FC<WithReduxProps> = ({ color, onChangeColor }) => {
  return <SketchPicker color={color} onChangeComplete={onChangeColor} />;
};

const mapStateToProps = (state: any) => ({
  color: state.color,
});

const mapDispatchToProps = {
  onChangeColor: appActions.changeColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(WithRedux);
