import { purple } from "@mui/material/colors";
import {
  returnOrThrow,
  getWrapper,
  postWrapper,
  PRODUCT,
  REVIEWS,
  deleteWrapper,
  putWrapper,
  ASTROLOGERS_PRODUCT
} from "./util";



export const productList = async () => {
  const resJSON = await getWrapper(PRODUCT);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const productDetails = async (id) => {
  const resJSON = await getWrapper(`${PRODUCT}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const reviewsDetails = async (id) => {
  const resJSON = await getWrapper(`${REVIEWS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const productdelete = async (id) => {
  const resJSON = await deleteWrapper(`${PRODUCT}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const productStatusUpdate = async (data) => {
  const resJSON = await putWrapper(`${PRODUCT}/${data.id}/status`, data);
  const result = await returnOrThrow(resJSON);
  return result;
};


export const productCreate = async (data) => {
  const resJSON = await postWrapper(PRODUCT, data,true); // FormData allowed
  const result = await returnOrThrow(resJSON);
  return result;
};

export const productUpdate = async (data) => {
  const resJSON = await putWrapper(`${PRODUCT}/${data.get("id")}`, data,true);
  const result = await returnOrThrow(resJSON);
  return result;
};


// ---------------- ASTROLOGERS BY PRODUCT ----------------
export const astrologersByProduct = async (productId) => {
  const resJSON = await getWrapper(
    `${ASTROLOGERS_PRODUCT}/?product_id=${productId}`
  );
  return await returnOrThrow(resJSON);
};