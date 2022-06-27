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

// fetch users action
export const fetchUser = async (userId) => {
  return _fetchUsers(userId);
};

//fetch posts action
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
//fetch comments action
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

// create post action
export const createPost = ({ body }, handleClose) => {
  console.log("body", body);
  return async (dispatch, getState) => {
    try {
      const { data } = await jsonplaceholder.post(`/posts`, {
        title: "test add post",
        body: body,
        userId: 1,
      });
      dispatch({
        type: "posts",
        payload: [
          {
            ...data,
            user: { name: "Hossam Gamal", email: "hossamg122@atomica.ai" },
          },
          ...getState().blog.posts,
        ],
      });
      toast.success("your post has been created successfully");
      handleClose();
      console.log("Post Created", data);
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};

// update post action
export const updatePost = (values, handleClose) => {
  console.log("test");
  return async (dispatch, getState) => {
    try {
      const { data } = await jsonplaceholder.put(`/posts/${values.id}`, {
        ...values,
      });
      let record = getState().blog.posts.find((post) => post.id === data.id);
      record.body = data.body;
      console.log("record", record);
      toast.success("your post has been updated successfully");
      handleClose();
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
export const deletePost = (postId) => {
  return async (dispatch, getState) => {
    try {
      await jsonplaceholder.delete(`/posts/${postId}`);
      const modifiedPosts = getState().blog.posts.filter((post) => {
        return post.id !== postId;
      });
      dispatch({
        type: "posts",
        payload: modifiedPosts,
      });

      toast.success("your post has been deleted successfully");
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};

export const createComment = (postId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await jsonplaceholder.put(`/posts/${postId}`);
      console.log("data", data);
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
export const updateComment = (postId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await jsonplaceholder.put(`/posts/${postId}`);
      console.log("data", data);
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
export const deleteComment = (postId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await jsonplaceholder.put(`/posts/${postId}`);
      console.log("data", data);
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
