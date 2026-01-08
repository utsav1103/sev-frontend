import axios from "axios";

export function handleError(err: unknown, notificationTitle?: string) {
    let errMsg: string;
    if (axios.isAxiosError(err) && err.response?.data?.errorMessage) {
        errMsg = err.response?.data?.errorMessage
        console.log(errMsg);
    } else {
        errMsg = "An unexpected error occurred"
        console.log(errMsg, err);
    }

    if (notificationTitle && notificationTitle.length > 0) {
        // errorNotification(notificationTitle, errMsg);
    }

}