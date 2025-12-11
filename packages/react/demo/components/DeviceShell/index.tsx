import React, { useState } from 'react';
import { Menu } from 'antd';
import Main from '..//Main/index';
import './index.less';

const DeviceShell: React.FC = () => {
  const [mode, setMode] = useState('pc');

  const items = [
    { label: 'PC', key: 'pc' },
    { label: 'H5', key: 'h5' },
    { label: 'Bubble', key: 'bubble' },
  ];

  return (
    <div className="shell-wrap">
      <Menu
        className="menu"
        items={items}
        selectedKeys={[mode]}
        onSelect={({ key }) => setMode(key)}
      />
      <div className={`shell ${mode}`}>
        <Main mode={mode} />
      </div>
    </div>
  );
};

export default DeviceShell;
