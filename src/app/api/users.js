import { returnOrThrow, patchWrapper, getWrapper, USERS ,ADMIN_ADDRESS} from './util';

export const usersList = async () => {
  const resJSON = await getWrapper(USERS);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const userProfile = async () => {
  const resJSON = await getWrapper(USERS + '/profile');
  const result = await returnOrThrow(resJSON);
  return result;
};

export const userDetails = async (id) => {
  const resJSON = await getWrapper(`${USERS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const userUpdate = async (data) => {
  const resJSON = await patchWrapper(`${USERS}/${data.id}`, data);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const adminUserAddresses = async (id) => {
  const resJSON = await getWrapper(`${ADMIN_ADDRESS}/${id}/`);
  const result = await returnOrThrow(resJSON);
  return result;
}