const Loading = () => {
  return (
    <div>
      <div className="absolute z-50 flex items-center justify-center w-full h-screen dark:bg-gray-900 bg-gray-50 bg-opacity-40 ">
        <div className="w-12 loading">
          <div className="bg-purple-500 loading-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
