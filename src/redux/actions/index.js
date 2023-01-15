export const SET_QUERY = "SET_QUERY";
export const SEARCH_FOR_MEDIA = "SEARCH_FOR_MEDIA";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const SET_REVIEWS = "SET_REVIEWS";

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

export const addReviewAction = (id, data) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async (dispatch) => {
    try {
      let response = await fetch(
        `https://m2-soloproj-netflix-api-production.up.railway.app/reviews/${id}`,
        options
      );
      if (response.ok) {
        console.log("success");
        dispatch(getReviewsAction(id));
      } else {
        console.log("Failed to post comment.");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteReviewAction = (id) => {
  const options = {
    method: "DELETE",
  };
  return async () => {
    try {
      let response = await fetch(
        `https://m2-soloproj-netflix-api-production.up.railway.app/reviews/${id}`,
        options
      );
      if (response.ok) {
        console.log("Deleted");
      } else {
        console.log("Could not delete comment");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getReviewsAction = (id) => {
  return async (dispatch) => {
    try {
      let response = await fetch(
        `https://m2-soloproj-netflix-api-production.up.railway.app/reviews/${id}`
      );
      if (response.ok) {
        let data = await response.json();
        dispatch({
          type: SET_REVIEWS,
          payload: data,
        });
        dispatch(getReviewsAction(id));
      } else {
        console.log("There was an error fetching reviews");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
