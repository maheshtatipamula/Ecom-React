import axios from "axios";

import Cookies from "js-cookie";

const loggedInUser = Cookies.get("token");

export function createOrder(items) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/orders/create-new-order",
        {
          ...items,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser}`,
          },
        }
      );
      const data = response.data;
      resolve({ data });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Request failed";
        reject(errorMessage);
      } else if (error.request) {
        reject("No response received from the server");
      } else {
        reject("Error setting up the request");
      }
    }
  });
}

export function fetchSingleOrder(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/orders/get-my-order/${id}`,

        {
          headers: {
            Authorization: `Bearer ${loggedInUser}`,
          },
        }
      );
      const data = response.data;
      resolve({ data });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Request failed";
        reject(errorMessage);
      } else if (error.request) {
        reject("No response received from the server");
      } else {
        reject("Error setting up the request");
      }
    }
  });
}
