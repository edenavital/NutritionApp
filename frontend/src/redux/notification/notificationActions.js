
import "./lib/notification.css";
import { NotificationManager } from "react-notifications";
//Modify - a notification should get type, text params
//In redux - only because it is global


//In order to use: call showNotifications and pass (type, message)
export const createNotification = (type, message) => {

    switch (type) {
      case "info":
        return NotificationManager.info(message, "INFO!");
      case "warning":
        return NotificationManager.warning(message, "WARNING!", 3000);
      case "success":
        return NotificationManager.success(message, "SUCCESS!");
      case "error":
        return NotificationManager.error(message, "ERROR!");
      default:
        return null;
    }
};

export const showNotification = (type, message) => createNotification(type, message);