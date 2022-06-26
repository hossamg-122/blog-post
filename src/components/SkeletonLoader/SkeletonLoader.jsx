import * as React from "react";
import { Card, CardHeader, Skeleton } from "@mui/material";

export const SkeletonLoader = () => {
  return (
    <Card  sx={{m:2 }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />

      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
    </Card>
  );
};
