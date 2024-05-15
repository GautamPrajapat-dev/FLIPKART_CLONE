import axios from "axios";

const AsyncHandler = async (method, endpoint, config = {}, data = null) => {
  const url = `${process.env.REACT_APP_URL}/${endpoint}`;

  try {
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url, config);
        break;
      case "POST":
        response = await axios.post(url, data, config);
        break;
      case "PUT":
        response = await axios.put(url, data, config);
        break;
      case "DELETE":
        response = await axios.delete(url, config);
        break;
      // Add more cases for other HTTP methods as needed
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
};

export default AsyncHandler;
