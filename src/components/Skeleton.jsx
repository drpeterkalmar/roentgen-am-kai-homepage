import React from 'react';

const Skeleton = ({ className, variant = 'rect' }) => {
  const baseClasses = "bg-gray-200 dark:bg-gray-800 animate-skeleton";
  const variants = {
    rect: "rounded-2xl",
    circle: "rounded-full",
    text: "rounded h-4 w-full"
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const ServiceSkeleton = () => (
  <div className="glass rounded-[40px] p-8 flex flex-col gap-6 aspect-square">
    <Skeleton className="w-16 h-16 rounded-2xl" />
    <div className="space-y-3">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
    <Skeleton className="mt-auto h-4 w-24" />
  </div>
);

export default Skeleton;
