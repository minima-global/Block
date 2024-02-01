import * as React from 'react';
import Lottie from 'lottie-react';
import splashAnimation from '../../splashAnimation.json';
import getAppUID from '../../utilities/getAppUID';

const Splash = () => {
  const localStorageItemName = '__block_splash';
  const [displaySplash, setDisplaySplash] = React.useState(false);

  React.useEffect(() => {
    const appUID = getAppUID();
    const splash = localStorage.getItem(localStorageItemName);

    if (!splash || splash !== appUID) {
      setDisplaySplash(true);
    }
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const appUID = getAppUID();
      setDisplaySplash(false);
      localStorage.setItem(localStorageItemName, appUID);
    }, 1800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {displaySplash && (
        <div className="fixed bg-grey-two flex justify-center items-center h-screen w-screen absolute z-50">
          <div className="text-center">
            <div className="mb-24">
              <Lottie animationData={splashAnimation} style={{ width: '125px' }} loop={false} />
            </div>
            <div className="absolute left-0 right-0 margin-auto bottom-20 text-white">Minima Block 2.3.1</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Splash;
