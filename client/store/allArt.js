import axios from 'axios';

const GOT_ALL_ART = 'GOT_ALL_ART';


//action creation
export const setAllArt = (allArt) => ({
  type: GOT_ALL_ART,
  allArt,
});

//thunk creator
export const fetchAllArt = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/artworks');
      console.log(data, "DATA")
      dispatch(setAllArt(data));
    } catch (e) {
      console.log("COULDN'T FETCH ARTWORKS", e);
    }
  };
};


//reducer

export default function allArtsReducer(state = [], action) {
  switch (action.type) {
    case GOT_ALL_ART:
      return action.allArt;
    default:
      return state;
  }
}

