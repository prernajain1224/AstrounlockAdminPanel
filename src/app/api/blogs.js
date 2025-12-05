import {
  returnOrThrow,
  postWrapper,
  getWrapper,
  putWrapper,
  BLOGS,
  deleteWrapper,
} from "./util";

export const blogsList = async () => {
  const resJSON = await getWrapper(BLOGS);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const blogsDetails = async (id) => {
  const resJSON = await getWrapper(`${BLOGS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const deleteBlogs = async (id) => {
  const resJSON = await deleteWrapper(`${BLOGS}/${id}`);
  const result = await returnOrThrow(resJSON);
  return result;
};

export const blogsUpdate = async (data) => {
  const resJSON = await putWrapper(
    `${BLOGS}/${data.get("id")}`,
    data,
    true
  );
  const result = await returnOrThrow(resJSON);
  return result;
};

export const blogsCreate = async (data) => {
  const resJSON = await postWrapper(BLOGS, data, true);
  const result = await returnOrThrow(resJSON);
  return result;
};
