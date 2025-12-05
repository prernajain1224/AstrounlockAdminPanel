import {
  returnOrThrow,
  postWrapper,
  getWrapper,
  putWrapper,
  CATEGORIES,
  deleteWrapper,
} from "./util";

export const categorieList = async () => {
  const resJSON = await getWrapper(CATEGORIES);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const categorieDetails = async (id) => {
  const resJSON = await getWrapper(`${CATEGORIES}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const deleteCategorie = async (id) => {
  const resJSON = await deleteWrapper(`${CATEGORIES}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const categorieUpdate = async (data) => {
  const resJSON = await putWrapper(
    `${CATEGORIES}/${data.get("id")}`,
    data,
    true
  );
  const result = await returnOrThrow(resJSON);
  return result;
};

export const categorieCreate = async (data) => {
  const resJSON = await postWrapper(CATEGORIES, data, true);
  const result = await returnOrThrow(resJSON);
  return result;
};
