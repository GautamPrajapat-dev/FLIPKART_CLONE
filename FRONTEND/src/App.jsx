import OfflineStatus from "./Components/Offline-Status.jsx";

const App = () => {
  return <>{!window.navigator.onLine && <OfflineStatus />}</>;
};

export default App;
