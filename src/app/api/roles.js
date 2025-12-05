import {
  returnOrThrow,
  postWrapper,
  getWrapper,
  ROLES,
  putWrapper,
  deleteWrapper,
} from "./util";

export const rolesList = async () => {
  const resJSON = await getWrapper(ROLES);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const roleDetails = async (id) => {
  const resJSON = await getWrapper(`${ROLES}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const deleteRole = async (id) => {
  const resJSON = await deleteWrapper(`${ROLES}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const roleUpdate = async (data) => {
  const resJSON = await putWrapper(`${ROLES}/${data.id}`, data);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const roleCreate = async (data) => {
  const resJSON = await postWrapper(ROLES, data);
  const result = await returnOrThrow(resJSON);
  return result;
};
