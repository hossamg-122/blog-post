import { jsonplaceholder } from "../../api's/jsonPlaceHolder";

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const {data} = await jsonplaceholder.get("/posts");
      dispatch({
        type:'posts',
        payload:data
      })
     
    } catch (error) {
      console.log("error", error.response);
    }
  };
};
