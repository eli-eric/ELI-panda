export const CHANGE_COLOR = "APP/CHANGE_COLOR";

export const actions = {
  changeColor: ({ hex }: { hex: any }) => ({ type: CHANGE_COLOR, hex }),
};

const initialState = {
  color: "#F5A623",
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return { ...state, color: action.hex };
    default:
      return state;
  }
};
