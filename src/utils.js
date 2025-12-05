import { enqueueSnackbar } from "notistack";
import { format } from "date-fns";


export const SUCCESS = "success";
export const INFO = "info";
export const ERROR = "error";

export const DASHBOARD = "dashboard";
export const PROFILE = "profile";
export const NOTIFICATION = "notification";

export const BLACK = "#3e3e3e";
export const RED = "red";
export const GREEN = "green";
export const ORANGE = "orange";
export const LIGHT_BLUE = "#f3f6fd";
export const LIGHT_RED = "#C83C31";
export const WHITE = "#FFF";
export const LIGHT_YELLOW = "#F2C27F";

export const SESSION_EXPIRED = "Session Expired. Login to continue";
export const SOMETHING_WENT_WRONG = "Something went wrong";

export const SESSION_TIMEOUT = "sessionTimeout";

export const DELETED = "Deleted";
export const CONFIRMED = "Confirmed";
export const CANCELLED_BY_ADMIN = "Cancelled by Admin";

export const BOOLEAN_OPTIONS = [
  { value: "", label: "Select Option" },
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export const RELIGION_OPTIONS = [
  { value: "", label: "Select Religion" },
  { value: "Hinduism", label: "Hinduism" },
  { value: "Christianity", label: "Christianity" },
  { value: "Sikhism", label: "Sikhism" },
  { value: "Buddhism", label: "Buddhism" },
  { value: "Jainism", label: "Jainism" },
];

export const STATUS_OPTIONS = [
  { value: "", label: "Select User Type" },
  { value: "Administrator", label: "Administrator" },
  { value: "User", label: "User" },
  { value: "Astrologer", label: "Astrologer" },
];


export const formatPrice = (value) => {
  if (!value) return "₹ 0";
  return `₹ ${Math.round(Number(value)).toLocaleString("en-IN")}`;
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "Not Available";
  try {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy, hh:mm a");
  } catch (err) {
    return "Invalid Date";
  }
};

export const showSnackbar = (message, type) => {
  enqueueSnackbar(`${message}`, {
    variant: `${type}`,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  });
};

export const titleize = (sentence) => {
  const words = sentence?.replace("_", " ")?.split(" ");
  for (let i = 0; i < words?.length; i++) {
    words[i] = words[i][0]?.toUpperCase() + words[i]?.substr(1);
  }
  return words?.join(" ");
};

export const priceRound = (value) => {
  return Math.round(value);
};

export const sanitizeText = (value) => {
  return value.replace(/\s+/g, "");
};

export const sanitizeNumber = (value) => {
  return value.replace(/^\d*\.?\d*$/, "");
};

export const ok = "ok";
export const errorType = "error";
