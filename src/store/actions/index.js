import { jsonplaceholder } from "../../api's/jsonPlaceHolder";
import _ from "lodash";
import { toast } from "react-toastify";

const _fetchUsers = _.memoize(async (userId) => {
  try {
    return await jsonplaceholder.get(`./users/${userId}`);
  } catch (error) {
    console.log(error, error.response);
  }
});
export const fetchUser = async (userId) => {
  return _fetchUsers(userId);
};
export const fetchPosts = (setLoading) => {
  return async (dispatch) => {
    try {
      const { data } = await jsonplaceholder.get("/posts");
      const postsWithUsers = await Promise.all(
        data.map(async (post) => {
          return await fetchUser(post.userId)
            .then(({ data }) => {
              return { ...post, user: { ...data } };
            })
            .catch((error) => {
              console.log(error, error.response);
            });
        })
      );
      toast.success("posts are fetched successfully");

      dispatch({
        type: "posts",
        payload: postsWithUsers,
      });
      setLoading(false);
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
export const fetchComments = (postId, setLoadComments, setExpanded) => {
  return async (dispatch, getState) => {
    setLoadComments(true);
    try {
      const { data } = await jsonplaceholder.get(`/posts/${postId}/comments`);
      const modifiedPosts = getState().blog.posts.map((post) => {
        return post.id === postId ? { ...post, comments: data } : post;
      });
      toast.success("comments are fetched successfully");
      dispatch({
        type: "posts",
        payload: modifiedPosts,
      });

      setLoadComments(false);
      setExpanded(true);
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
