import React from 'react';

interface IBlankLink {
  href: string;
  className?: string;
}

export const MyLink: React.FC<IBlankLink> = (props) => (
  <a target="_blank" {...props} />
);
