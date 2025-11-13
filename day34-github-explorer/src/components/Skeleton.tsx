import React from "react";
const Skeleton: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="animate-pulse rounded-md border p-3 text-sm opacity-70">
      {text}
    </div>
  );
}
export default Skeleton;