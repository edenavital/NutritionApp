import "./lib/notification.css";
import { NotificationManager } from "react-notifications";

//Create notification
export const createNotification = type => {
  return () => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "UserCreated":
        NotificationManager.success("User has been created", "SUCCESS!");
        break;
      case "RightCredentials":
        NotificationManager.success("Successfully logged in", "SUCCESS!");
        break;
      case "UserExists":
        NotificationManager.error("User is already exists", "ERROR!");
        break;
      case "WrongCredentials":
        NotificationManager.error(
          "Wrong credentials. Please try again",
          "ERROR!"
        );
        break;
      default:
        break;
    }
  };
};

//The functions display alerts
export const infoNotification = createNotification("info");
export const warningNotification = createNotification("warning");

//Register Component:
export const successNot_UserCreated = createNotification("UserCreated");
export const errorNot_UserExists = createNotification("UserExists");

//Login Component:
export const successNot_RightCredentials = createNotification(
  "RightCredentials"
);
export const errorNot_WrongCredentials = createNotification("WrongCredentials");
