import axios from "axios";
import Cookies from "js-cookie";

const loggedInUser = Cookies.get("token");

export function addToCart(items) {
  return new Promise(async (resolve, reject) => {
    try {
      const { quantity, id } = items;

      const response = await axios.post(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/cart/add-to-cart",
        {
          quantity,
          prodId: id,
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

export function fetchItemsByUserId() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(
        `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/cart/get-all-cart`,
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

export function updateCart(items) {
  const { quantity } = items;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        ` https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/cart/update-cart-item/${items._id}`,
        {
          quantity,
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

export function deleteItemsInCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/cart/delete-cart-item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${loggedInUser}`,
          },
        }
      );
      const data = response.data;

      resolve({ data: { id: data._id } });
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
export function restCart() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchItemsByUserId();
      const items = response.data;

      for (let item of items) {
        await deleteItemsInCart(item._id);
      }
      resolve({ status: "success" });
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
