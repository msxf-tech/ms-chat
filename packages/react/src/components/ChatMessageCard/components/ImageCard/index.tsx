import React from 'react';
import { Image } from 'antd';

export interface IImageCardProps {
  url: string;
  width?: number;
}

const ImageCard: React.FC<IImageCardProps> = ({ url, width = 100 }) => {
  return <Image width={width} src={url} />;
};

export default ImageCard;
