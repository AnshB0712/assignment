import customAxios from "../api/axios";

export const returnNewAccessToken = async () => {
  try {
    const res = await customAxios.get("/public/refresh-token");
    console.log(res);
    return res?.data.token;
  } catch (e) {
    console.log("Error while Refreshing Access Token", e);
    throw e;
  }
};
