//ROUTES PATHS
export const ROUTERPATHS = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/home",
  FOOD: "/food",
  ROOT: "/",
  FOOD_LIST: "/foodlist"
};

export const NOTIFICATION_TYPES = {
  CHANGE: "change",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

export const NOTIFICATION_MESSAGES = {
  BAD_LOGIN: "There was a problem with your credentials, please try again",
};

export const SIDE_DRAWER_OPTIONS = [
  { label: "Dashboard", to: ROUTERPATHS.HOME },
  { label: "Add Food", to: ROUTERPATHS.FOOD },
  { label: "Food List", to: ROUTERPATHS.FOOD_LIST },
  { label: "Logout", to: ROUTERPATHS.LOGIN },
]
