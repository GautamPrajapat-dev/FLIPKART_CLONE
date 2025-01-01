import { memo } from 'react';

const Loading = () => {
  return (
    <div>
      <div className="fixed z-[100] flex items-center justify-center w-full h-screen  bg-personal-10 bg-opacity-5 dark:bg-gray-900 ">
        <div className="w-12 loading">
          <div className="bg-purple-500 loading-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(Loading);
