import React from 'react';

export interface ITextCardProps {
  content: string;
  type: string;
}

const TextCard: React.FC<ITextCardProps> = ({ content }) => {
  return <div>{content}</div>;
};

export default TextCard;
