import React from 'react';
import type { IHeaderProps } from '../../types/index';
import './index.less';

const Header: React.FC<IHeaderProps> = ({ title = '' }) => {
  return <div className="header">{title}</div>;
};

// 默认 props
Header.defaultProps = {
  title: '',
};

export default Header;
