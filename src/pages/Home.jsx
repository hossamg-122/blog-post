import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Post, PostCard, SkeletonLoader,Footer } from "../components";
import { fetchPosts } from "../store/actions";
export const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatcher = useDispatch();
  const { posts } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatcher(fetchPosts(setLoading));
  }, []);
  return (
    <Container
      maxWidth="sm"
      component="main"
      sx={{ display: "flex", flexDirection: "column", height: "90vh" }}
    >
      <Box component="main" sx={{}}>
        <Post />
        {loading ? (
          <SkeletonLoader />
        ) : (
          posts?.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Box>
      <Footer />
    </Container>
  );
};
