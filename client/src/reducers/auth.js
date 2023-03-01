import * as actionType from '../constants/actionTypes';


const authReducer = async (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
    localStorage.setItem('user', JSON.stringify({...action?.data}));
    return {...state, authData: action?.data};
    
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };

    case actionType.CLEAR_CACHE:
      const clearCache = await fetch("http://localhost:3000/api/clearCache", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {request: "delete", file: action?.data?.file},
        })
      })
      const data = await clearCache.json()
      if(data?.error) {
        return alert("There was an error while processing your request. Please try to refresh the page, if the error persists clear the chat and/or the cache. Finally if the erorr is still present try again later.")
      }
      console.log(data.error)

      if(data.status === "File already cleared") {
        alert("Cache already cleared")
      }  else {
        alert("All the previous conversations have been cleared, and now the cache is cleaned")
      }

    default:
        return state;
    }
};

export default authReducer;