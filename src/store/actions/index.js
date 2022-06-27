import { jsonplaceholder } from "../../api's/jsonPlaceHolder";
import _ from "lodash";
import { toast } from "react-toastify";
export const validateUser = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      dispatch({
        type: "user",
        payload: user,
      });
      dispatch({
        type: "isLogin",
        payload: true,
      });
    } else {
      dispatch({
        type: "isLogin",
        payload: false,
      });
      dispatch({
        type: "user",
        payload: { name: "", email: "" },
      });
    }
  };
};
export const login = ({ email, password }, router) => {
  return (dispatch) => {
    if (email === "hossamg@atomica.ai" && password === "123456") {
      dispatch({
        type: "user",
        payload: { email: email, name: "Hossam Gamal" },
      });
      dispatch({
        type: "isLogin",
        payload: true,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({ email: email, name: "Hossam Gamal" })
      );
      toast.success("You have signed in successfully");

      router("/");
    } else {
      toast.error("Wrong email or password, please try again");
    }
  };
};
export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem("userData");
    dispatch({
      type: "user",
      payload: { email: "", name: "" },
    });
    dispatch({
      type: "isLogin",
      payload: false,
    });

    toast.success("You have signed out successfully");
  };
};
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
export const deletePost = ({ id }) => {
  return async (dispatch, getState) => {
    try {
      await jsonplaceholder.delete(`/posts/${id}`);
      const modifiedPosts = getState().blog.posts.filter((post) => {
        return post.id !== id;
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

export const createComment = (values) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await jsonplaceholder.post(`/comments`, {
        ...values,
      });
      let modifiedPost = getState().blog.posts.map((post) => {
        if (post.id === data.postId) {
          post.comments = [...post.comments, data];
        }
        return post;
      });
      dispatch({
        type: "posts",
        payload: modifiedPost,
      });

      toast.success("your Comment has been created successfully");
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
export const updateComment = (values, handleClose) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await jsonplaceholder.put(`/comments/${values.id}`, {
        ...values,
      });
      const postIndex = getState().blog.posts.findIndex(
        (post) => post.id === data.postId
      );
      const commentIndex = getState().blog.posts[postIndex].comments.findIndex(
        (comment) => comment.id === data.id
      );
      console.log("postIndex", postIndex);
      console.log("commentIndex", commentIndex);
      dispatch({
        reducer: "blog",
        type: `posts.${postIndex}.comments.${commentIndex}`,
        payload: data,
      });

      toast.success("your comment has been updated successfully");
      handleClose();
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
export const deleteComment = ({ postId, id }) => {
  return async (dispatch, getState) => {
    try {
      await jsonplaceholder.delete(`/comments/${id}`);
      const modifiedPosts = getState().blog.posts.map((post) => {
        if (post.id === postId) {
          post.comments = post.comments.filter((comment) => comment.id !== id);
        }
        return post;
      });
      dispatch({
        type: "posts",
        payload: modifiedPosts,
      });

      toast.success("your comment has been deleted successfully");
    } catch (error) {
      toast.error("something went wrong, please refresh the page");
    }
  };
};
