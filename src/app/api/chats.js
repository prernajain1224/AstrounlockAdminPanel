import {
  returnOrThrow,
  postWrapper,
  getWrapper,
  SINGLE_ROLES,
  CHATS_CREATED,
  CHATS,
  CHATS_LIST,
  CHATS_UPDATE,
  putWrapper,
  WALLET_BALANCE,
  deleteWrapper,
} from "./util";



export const chatsList = async () => {
  const resJSON = await getWrapper(CHATS_LIST);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const chatsDetails = async (id) => {
  const resJSON = await getWrapper(`${CHATS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

// export const chatsdelete = async (id) => {
//   const resJSON = await deleteWrapper(`${CHATS}/${id}`);
//   const result = await returnOrThrow(resJSON);
//   return result;
// };

// export const chatsUpdate = async (data) => {
//   const resJSON = await putWrapper(`${CHATS}/${data.id}`, data, true);
//   const result = await returnOrThrow(resJSON);
//   return result;
// };


export const chatsCreate = async (data) => {
  const resJSON = await postWrapper(CHATS_CREATED, data, true);
  const result = await returnOrThrow(resJSON);
  return result;
};
