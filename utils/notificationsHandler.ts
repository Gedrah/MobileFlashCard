import {AsyncStorage} from "react-native";
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export function createNotificationObject() {
    return {
        title: 'FlashCard',
        body: "It seems that you didn't completed a quiz yet !",
        ios : {
            sound: true,
        },
        android : {
            sound: true,
            priority: 'max',
            sticky: false,
            vibrate: [0, 250, 250, 250],
        }
    }
}

export function getNotificationInfos() {
    AsyncStorage.getItem('quizAnswered').then((datas: any) => {
        const isQuizAnswered = JSON.parse(datas);
        if (!isQuizAnswered) {
            registerForPushNotificationsAsync()
        }
    });
};

export function createNotification(date: any) {
    Notifications.cancelAllScheduledNotificationsAsync();
    let dateToProgram = new Date(date);
    Notifications.scheduleLocalNotificationAsync(
        createNotificationObject(),
        {time : dateToProgram}
    );
    AsyncStorage.setItem('quizAnswered', JSON.stringify(true));
    const dateToShow = `${dateToProgram.getFullYear()}/${dateToProgram.getMonth() + 1}/${dateToProgram.getDay()}`;
    const hoursToShow = `${dateToProgram.getHours()}:${dateToProgram.getMinutes()}`;
    alert(`A notification will show on ${dateToShow} at ${hoursToShow} if you don't complete at least one quiz.`);
}

export function clearNotification() {
    AsyncStorage.removeItem('quizAnswered').then(() => {
        Notifications.cancelAllScheduledNotificationsAsync();
    });
}

export function clearScheduleNotification() {
    AsyncStorage.removeItem('date');
}

export default function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then((datas: any) => {
            const status = datas.status;
            if (status === 'granted') {
                AsyncStorage.getItem('date').then((datas) => {
                    if (datas) {
                        let date = JSON.parse(datas);
                        createNotification(date);
                    } else {
                        let date = new Date();
                        date.setDate(date.getDate() + 1);
                        createNotification(date);
                    }
                });
            }
        });
    } else {
        alert('Must use physical device for Push Notifications');
    }
};
