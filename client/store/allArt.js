import axios from 'axios';

const GOT_ALL_ART = 'GOT_ALL_ART';
//const TOKEN = 'token'

//action creation
export const setAllArt = (allArt) => ({
  type: GOT_ALL_ART,
  allArt,
});

//thunk creator
export const fetchAllArt = () => {
  return async (dispatch) => {
    try {
      const { data: allArt } = await axios.get('/api/allArt');
      dispatch(setAllArt(allArt));
    } catch (e) {
      console.log("COULDN'T FETCH ARTWORKS", e);
    }
  };
};


//reducer

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GOT_ALL_ART:
      return action.allArt;
    default:
      return state;
  }
}

