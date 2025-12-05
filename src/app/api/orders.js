import {
  returnOrThrow,
  getWrapper,
  ORDERS,
  deleteWrapper,
} from "./util";



export const ordersList = async () => {
  const resJSON = await getWrapper(ORDERS);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const ordersDetails = async (id) => {
  const resJSON = await getWrapper(`${ORDERS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};