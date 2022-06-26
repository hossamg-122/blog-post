import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../store/actions";
export const Home = () => {
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(fetchPosts());
  }, []);
  return <Box sx={{
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor:'red',
    color: 'text.primary',
    borderRadius: 1,
    fontSize:'7rem',
    fontFamily:'Montserrat',
   
  }}>P platform</Box>;
};
