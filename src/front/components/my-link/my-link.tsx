import React from 'react';

interface IBlankLink {
  href: string;
}

export const MyLink: React.FC<IBlankLink> = ({ href, ...restProps }) => (
  <a target="_blank" {...restProps} />
);
