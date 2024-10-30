import React from "react";
import { Skeleton } from "@mui/material";

export default function Spinner() {
  return (
    <div className="text-center my-3">
      <Skeleton
        variant="rectangular"
        width={200}
        height={200}
        animation="pulse"
      />
    </div>
  );
}
