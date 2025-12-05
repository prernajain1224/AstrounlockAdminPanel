import {
  returnOrThrow,
  postWrapper,
  getWrapper,
  SINGLE_ROLES,
  USEREditProfile,
  ADMIN_USERS,
  STATISTICS,
  putWrapper,
  WALLET_BALANCE,
  deleteWrapper,
} from "./util";



export const StatisticsList = async () => {
  const resJSON = await getWrapper(STATISTICS);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const adminUsersList = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const resJSON = await getWrapper(`${ADMIN_USERS}?${query}`);
  const result = await returnOrThrow(resJSON);
  return result;
};


export const walletBalanceDetails = async (id) => {
  const resJSON = await getWrapper(`${WALLET_BALANCE}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const WalletBalanceList = async () => {
  const resJSON = await getWrapper(WALLET_BALANCE);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const adminUserDetails = async (id) => {
  const resJSON = await getWrapper(`${ADMIN_USERS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const adminUserdelete = async (id) => {
  const resJSON = await deleteWrapper(`${ADMIN_USERS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const adminUserUpdate = async (data) => {
  const id = data.get('id');
  const resJSON = await putWrapper(`${ADMIN_USERS}/${id}`, data, true);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const EditProfile = async ({data,id}) => {
  const resJSON = await putWrapper(`${USEREditProfile}/${id}`, data, true);
  const result = await returnOrThrow(resJSON);
  return result;
};



export const adminUserCreate = async (data) => {
  console.log(data,"=============>455")
  const resJSON = await postWrapper(ADMIN_USERS, data, true);
  const result = await returnOrThrow(resJSON);
  return result;
};
