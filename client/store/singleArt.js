import axios from "axios";

const SET_SINGLE_ART = "SET_SINGLE_ART";

export const setSingleArt = (art) => ({
  type: SET_SINGLE_ART,
  art
});

export const fetchArt = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/artworks/${id}`);
      dispatch(setSingleArt(data));
    } catch (e) {
      console.log("COULDN'T FETCH SINGLE ART", e);
    }
  };
};

//reducer
export default function singleArtReducer(state = [], action) {
  switch (action.type) {
    case SET_SINGLE_ART:
      return action.art;
    default:
      return state;
  }
}
