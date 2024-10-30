// SkeletonLoader.js
import React from "react";
import { Skeleton } from "@mui/material";

const SkeletonLoader = ({ count = 20 }) => {
  return (
    <div className="container">
      <div className="row">
        {Array.from(new Array(count)).map((_, index) => (
          <div className="col-xl-3 col-md-6 mb-3" key={index}>
            <div className="card">
              <Skeleton variant="rectangular" width="100%" height={140} />
              <div className="card-body">
                <Skeleton variant="text" />
                <Skeleton variant="text" width="80%" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
