import axios from "axios";

import Cookies from "js-cookie";

const loggedInUser = Cookies.get("token");

export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/orders/get-my-orders",
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

export function fetchLoggedInUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/user/my-profile",
        {
          headers: {
            Authorization: `Bearer ${loggedInUser}`,
          },
        }
      );
      const data = await response.data;
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
export function updateUser(details) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/user/update",
        {
          ...details,
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

export function addProdToWishlist(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/user/add-to-wishlist/${id}`,
        {},
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

// return new Promise(async (resolve) => {
//   const response = await axios.put(
//     `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/user/add-to-wislist/${id}`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${loggedInUser}`,
//       },
//     }
//   );
//   resolve({ data: "success" });
// });

export function fetchAllWishlistProducts(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(
        `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/user/get-wishlist-products`,
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

export function deleteAddress(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/user/delete-address/${id}`,

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
