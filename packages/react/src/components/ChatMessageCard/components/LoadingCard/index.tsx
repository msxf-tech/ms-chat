import React from 'react';
import './index.less';

export interface ILoadingCardProps {
  content?: string;
  type: string;
}

const LoadingCard: React.FC<ILoadingCardProps> = () => {
  return (
    <div className="three-dot">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default LoadingCard;
