import axios from "axios";
import Cookies from "js-cookie";

const loggedInUser = Cookies.get("token");

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await axios.get(
      "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/products/get-all-products",
      {
        headers: {
          Authorization: `Bearer ${loggedInUser}`,
        },
      }
    );
    const data = response.data;

    resolve({ data });
  });
}

export function fetchProductByFilters(filter, sort, pagination) {
  let querystring = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      querystring += `${key}=${categoryValues}&`;
    }
  }

  for (let key in sort) {
    querystring += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    querystring += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/products/get-all-products?" +
          querystring,
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

export function fetchAllBrands() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/brands/get-all-brands",
        {
          headers: {
            Authorization: `Bearer ${loggedInUser}`,
          },
        }
      );
      const data = response.data.brands;
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

export function fetchSingleProduct(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(
        `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/products/get-a-product/${id}`,
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
export function fetchAllCategory() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/category/get-all-categories",
        {
          headers: {
            Authorization: `Bearer ${loggedInUser}`,
          },
        }
      );

      const data = response.data.categories;
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
