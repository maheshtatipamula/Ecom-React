import axios from "axios";

export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await axios("http://localhost:8080");
    const data = response.data;
    resolve({ data });
  });
}
