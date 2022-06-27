import { Box, Typography } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <Box component="footer" sx={{ textAlign: "center", mt: "auto", py: 8 }}>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{
          opacity: ".3",
          cursor: "pointer",
          transition: "all .25s ease-in-out",
          ":hover": { opacity: 1 },
        }}
      >
        Atomica, All rights reserved
      </Typography>
    </Box>
  );
};
