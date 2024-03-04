import { publicRequest } from "../../requestMethods";

export const sendData = async (data: {}) => {
  try {
    const res = await publicRequest.post("/sendorderdetails", {
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};
