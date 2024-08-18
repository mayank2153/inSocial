import { NotificationManager } from "react-notifications";

export const notifyError = (message) => {
    NotificationManager.error(message, 'Error', 3000);
} 

export const notifySuccess = (message) => {
    NotificationManager.success(message, 'Success', 3000);
}