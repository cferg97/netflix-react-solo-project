export const SET_QUERY = "SET_QUERY";
export const SEARCH_FOR_MEDIA = "SEARCH_FOR_MEDIA";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

export const setSearchQueryAction = (i) => {
  return {
    type: SET_QUERY,
    payload: i,
  };
};

export const setIsLoadingAction = (i) => {
  return {
    type: SET_IS_LOADING,
    payload: i,
  };
};

export const searchAction = (query) => {
  return async (dispatch) => {
    try {
      let response = await fetch(
        `https://m2-soloproj-netflix-api-production.up.railway.app/media?search=${query}`
      );
      let fetchedData = await response.json();
      if (response.ok) {
        dispatch({
          type: SET_SEARCH_RESULTS,
          payload: fetchedData,
        });
      } else {
        console.log("There was an error fetching data.");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
