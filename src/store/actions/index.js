import { jsonplaceholder } from "../../api's/jsonPlaceHolder";

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await jsonplaceholder.get("/posts");
      console.log("response", response);
    } catch (error) {
      console.log("error", error.response);
    }
  };
};
