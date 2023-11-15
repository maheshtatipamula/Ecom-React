import axios from "axios";

export function createUser(details) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/user/register",
        {
          ...details,
        }
      );
      if (response.status === 200) {
        const data = response.data;

        resolve({ data });
      } else {
        reject("something went wrong");
      }
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

export function loginUser({ email, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `https://ecom-backend-git-main-maheshtatipamula.vercel.app/api/user/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const data = response.data;

        resolve({ data });
      } else {
        reject();
      }
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

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
