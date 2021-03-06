import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Post,
  PostCard,
  SkeletonLoader,
  Footer,
  ScrollUpButton,
} from "../../components";
import { fetchPosts } from "../../store/actions";
export const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatcher = useDispatch();
  const { posts } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatcher(fetchPosts(setLoading));
  }, []);
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", mt: 10 }}
      >
        <Box component="main">
          {/* this is create post card */}
          <Post />
          {loading ? (
            <SkeletonLoader />
          ) : (
            posts?.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </Box>
        <Footer />
      </Container>
      <ScrollUpButton />
    </>
  );
};
