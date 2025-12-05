import { purple } from "@mui/material/colors";
import {
  returnOrThrow,
  getWrapper,
  RECOMMENDATIONS,
  postWrapper,
  deleteWrapper,
  putWrapper,
} from "./util";



export const productrecommendationList = async () => {
  const resJSON = await getWrapper(RECOMMENDATIONS);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const productrecommendationDetails = async (id) => {
  const resJSON = await getWrapper(`${RECOMMENDATIONS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const productrecommendationUpdate = async (data) => {
  const resJSON = await putWrapper(`${RECOMMENDATIONS}/${data.id}`, data);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const productrecommendationdelete = async (id) => {
  const resJSON = await deleteWrapper(`${RECOMMENDATIONS}/${id}/delete`);
  const result = await returnOrThrow(resJSON);
  return result;
};


export const  productrecommendationCreate = async (data) => {
  const resJSON = await postWrapper(RECOMMENDATIONS, data);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const userProductRecommendations = async (userId) => {
  const resJSON = await getWrapper(`${RECOMMENDATIONS}/user/${userId}/`);
  const result = await returnOrThrow(resJSON);
  return result;
};