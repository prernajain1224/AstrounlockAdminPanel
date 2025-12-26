import { SOMETHING_WENT_WRONG } from "../../utils";

// Host
// export const HOST = "";
export const HOST =
"http://localhost:8001";
const BASE = HOST + "/api";

// App Config
export const APP_CONFIG = BASE + "/app/configuration";

// Auth
export const LOGIN = BASE + "/login";


// Users
export const USERS = BASE + "/users";
export const ADMIN_ADDRESS = BASE + "/admin/user-addresses";

export const FORGOT_PASSWORD = BASE + '/forgot-password';
export const RESET_PASSWORD = BASE + "/reset-password";

//reviews
export const REVIEWS = BASE + "/reviews";

// recommendations
export const RECOMMENDATIONS = BASE + "/recommendations";
//wallet balance
export const WALLET_BALANCE = BASE + "/wallet-balance";

// product
export const PRODUCT = BASE + "/admin/product";

// cart
export const CARTS = BASE + "/cart";

// chats
export const CHATS_CREATED = BASE + "/chat/create/";

// chats list
export const CHATS_LIST = BASE + "/chat/list/";

// chats detailed
export const CHATS = BASE + "/chat";

// Roles
export const ROLES = BASE + "/roles";

// Roles
export const ASTROLOGERS_PRODUCT = BASE + "/astrologers/by-product";

// Blogs
export const BLOGS = BASE + "/astrology-blogs";

//  wishlist
export const  WISHLIST = BASE + "/wishlist";

// AdminUsers
export const ADMIN_USERS = BASE + "/admin/users";

// FAQ
export const FAQ = BASE + "/faqs";

export const BANKDETAILS = BASE + "/banks";

// user statistics
export const STATISTICS = BASE + "/admin/statistics";

// user profile edit
export const USEREditProfile = BASE + "/user/update";

// orders
export const ORDERS = BASE + "/orders";

// Categories
export const CATEGORIES = BASE + "/categories";

// Usertypes
export const MEMBER = "Member";
export const VENDOR = "Vendor";
export const ADMINISTRATOR = "Administrator";
export const USER = "User";

export const saveFcmToken = (fcm) => {
  localStorage.setItem("fcmToken", fcm);
};

export const getToken = () => {
  const token = localStorage.getItem("Token");
  console.log(token,"fddgvvvv")
  return token;
};

export const getUserType = () => {
  const user_type = localStorage.getItem("userType");
  return user_type;
};

export const GST_REGEX =
  /^\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}$/;

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const getHeadersObject = () => {
  const token = getToken();
  return {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
    // "ngrok-skip-browser-warning": "69420",
  };
};

const getHeadersFileObject = () => {
  const token = getToken();
  return {
    Authorization: `Token ${token}`,
    // "Content-Type": "multipart/form-data",
  };
};

export const getImageUrl = (url) => {
  const completeUrl = url?.indexOf("http") > -1 ? url : HOST + url;
  return completeUrl;
};

export function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

// API Wrappers
export const returnOrThrow = async (resJSON) => {
  let result;
  const status = resJSON.status;
  if (status === 404 || status >= 500) {
    throw `${SOMETHING_WENT_WRONG}!`;
  } else if (status === 401) {
    throw "sessionTimeout";
  }
  try {
    result = await resJSON.json();
  } catch (err) {
    result = { error: SOMETHING_WENT_WRONG };
  }
  if (status !== 200) {
    throw result.error;
  }
  return result;
};

export const putWrapper = async (url, body, fileUpload = false) => {
  const headers = fileUpload
    ? await getHeadersFileObject()
    : await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "PUT",
    body: fileUpload ? body : JSON.stringify(body),
    headers,
  });
  return resJSON;
};

export const postWrapper = async (url, body, fileUpload = false) => {
  const headers = fileUpload
    ? await getHeadersFileObject()
    : await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "POST",
    body: fileUpload ? body : JSON.stringify(body),
    headers,
  });
  return resJSON;
};

export const patchWrapper = async (url, body, fileUpload = false) => {
  const headers = fileUpload
    ? await getHeadersFileObject()
    : await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "PATCH",
    body: fileUpload ? body : JSON.stringify(body),
    headers,
  });
  return resJSON;
};

export const getWrapper = async (url, body = {}) => {
  const headers = await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "GET",
    headers,
  });
  return resJSON;
};

export const deleteWrapper = async (url, body, fileUpload = false) => {
  const headers = fileUpload
    ? await getHeadersFileObject()
    : await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "DELETE",
    body: fileUpload ? body : JSON.stringify(body),
    headers,
  });
  return resJSON;
};

export const invoiceURL = (id) => {
  return HOST + `/bookings/${id}/generate-invoice.pdf`;
};

export const pnrURL = (id, passenger = "all") => {
  return (
    HOST + `/bookings/${id}/generate-pnr-status.pdf?passenger=${passenger}`
  );
};
