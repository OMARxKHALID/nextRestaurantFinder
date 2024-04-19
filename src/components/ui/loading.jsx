import React from "react";
import { Skeleton } from "./skeleton";

function SkeltonLoading() {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[100px] w-[225px] rounded-xl" />
        <div className="space-y-2 px-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-6 w-[190px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      </div>
    </div>
  );
}

export default SkeltonLoading;
