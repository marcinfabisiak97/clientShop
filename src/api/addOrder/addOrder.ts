import { AppDispatch } from "../../redux/store";
import {Order} from "./addOrderInterface";
import { userRequest } from "../../requestMethods";
import { addProduct } from "../../redux/cartSlice";
const localStorageItem = localStorage.getItem("persist:root");
const TOKEN =
  localStorageItem &&
  JSON.parse(JSON.parse(localStorageItem).user).currentUser.accessToken;

export const addOrder = async (dispatch: AppDispatch, order: Order) => {
    try {
      const res = await userRequest.post("/orders", order, {
        headers: {
          token: `Bearer ${TOKEN}`,
        },
      });
      dispatch(addProduct(res.data));
    } catch (err) {
      console.log(err);
    }
  };