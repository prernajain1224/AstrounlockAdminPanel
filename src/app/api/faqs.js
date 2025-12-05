import {
  returnOrThrow,
  getWrapper,
  FAQ,
  deleteWrapper,
} from "./util";



export const faqsList = async () => {
  const resJSON = await getWrapper(FAQ);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const faqsDetails = async (id) => {
  const resJSON = await getWrapper(`${FAQ}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const faqsdelete = async (id) => {
  const resJSON = await deleteWrapper(`${FAQ}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};
