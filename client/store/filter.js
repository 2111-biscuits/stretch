const SET_ORB_COLOR = "SET_ORB_COLOR";

const DEFAULT = "default";
const SKYBLUE = "skyblue";
const DARKORCHID = "darkorchid";
const CRIMSON = "crimson";
const DARKORANGE = "darkorange";
const GOLD = "gold";
const LIGHTPINK = "lightpink";
const LIMEGREEN = "limegreen";
const TURQUOISE = "turquoise";

export const setOrbColor = (Color) => ({
  type: SET_ORB_COLOR,
  Color,
});

const initialState = {
  Color: "default",
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORB_COLOR:
      return { ...state, Color: action.Color };
    default:
      return state;
  }
}
