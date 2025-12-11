import React from 'react';
import { useMode } from './hooks/useMode';
import type { IMsChatProps } from '../types';
import '../styles/globals.css';
import './index.less';

const Main = React.forwardRef<HTMLDivElement, IMsChatProps>((props, ref) => {
  const { currentComponent: CurrentComponent } = useMode(props);

  return (
    <div className="chat-main" ref={ref}>
      <CurrentComponent {...props} />
    </div>
  );
});

Main.displayName = 'Main';

export default Main;
