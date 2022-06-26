import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Post, PostCard, SkeletonLoader } from "../components";
import { fetchPosts } from "../store/actions";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatcher = useDispatch();
  const { posts } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatcher(fetchPosts(setLoading));
  }, []);
  return (
    <Box component="main" sx={{}}>
      <Post />
      {loading ? (
        <SkeletonLoader />
      ) : (
        posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </Box>
  );
};
