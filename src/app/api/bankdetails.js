import {
  returnOrThrow,
  getWrapper,
  BANKDETAILS,
  deleteWrapper,
} from "./util";



export const bankdetailsList = async () => {
  const resJSON = await getWrapper(BANKDETAILS);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const bankdetailsDetails = async (id) => {
  const resJSON = await getWrapper(`${BANKDETAILS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const bankdetailsdelete = async (id) => {
  const resJSON = await deleteWrapper(`${BANKDETAILS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};
