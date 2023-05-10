import * as React from 'react';
import { useContext } from 'react';
import { appContext } from '../../AppContext';

const Bootstrap: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { loaded } = useContext(appContext);

  if (!loaded) {
    return <></>;
  }

  return <>{children}</>;
};

export default Bootstrap;
