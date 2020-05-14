import React from 'react';

interface ISvg {
  className?: string;
  height: number;
  width: number;
}

export const Svg: React.FC<ISvg> = ({ className, children, height, width }) => (
  <div
    className={className}
    style={{ height, width }}
    dangerouslySetInnerHTML={{ __html: children as string }}
  />
);
