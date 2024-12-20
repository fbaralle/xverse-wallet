import classNames from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        classNames(
          'bg-background-highlight animate-pulse rounded-lg',
          className,
        ),
      )}
    />
  );
};
