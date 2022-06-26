import { Box, Typography } from "@mui/material";
import React from "react";
import { footerText } from "./Footer.style";

export const Footer = () => {
  return (
    <Box component="footer" sx={{ textAlign: "center",mt:'auto',py:8 }}>
      <Typography
        component="a"
        variant="body2"
        sx={footerText}
      >
        Atomica, All rights reserved
      </Typography>
    </Box>
  );
};
