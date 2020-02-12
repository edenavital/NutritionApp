import "./lib/notification.css";
import { NotificationManager } from "react-notifications";

//Create notification
export const createNotification = type => {
  return () => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("User has been created", "SUCCESS!");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error("User is already exists", "ERROR!");
        break;
      default:
        break;
    }
  };
};

//The functions display alerts
export const infoNotification = createNotification("info");
export const successNotification = createNotification("success");
export const warningNotification = createNotification("warning");
export const errorNotification = createNotification("error");
