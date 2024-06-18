import { useState } from "react";

// Custom hook for handling asynchronous operations with error handling
function useAsync(callback) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      const result = await callback(...args);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, execute };
}

export default useAsync;

// Uses

// import React from 'react';
// import useAsync from './useAsync';

// function MyComponent() {
//   const { loading, data, error, execute } = useAsync(fetchData);

//   async function fetchData() {
//     const response = await fetch('https://api.example.com/data');
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     return response.json();
//   }

//   return (
//     <div>
//       <button onClick={execute} disabled={loading}>
//         {loading ? 'Loading...' : 'Fetch Data'}
//       </button>
//       {error && <p>Error: {error}</p>}
//       {data && (
//         <div>
//           {/* Display your data here */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyComponent;
