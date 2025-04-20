import { useContext, useEffect, useRef } from "react";
import { View, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import React from "react";
import { ExpoPushTokenContext, ExpoPushTokenDispatchContext } from "../../config/AppContext";

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            Alert.alert("Thông báo", "Bạn chưa cấp quyền nhận thông báo!");
            return;
        }
        const res = await Notifications.getExpoPushTokenAsync();
        token = res.data
    } else {
        Alert.alert("Thông báo", "Bạn cần chạy trên thiết bị thật để nhận thông báo.");
    }

    return token;
}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Notification = (props) => {
    const notificationListener = useRef(null);
    const responseListener = useRef(null);
    const dispatchExpoPushToken = useContext(ExpoPushTokenDispatchContext)
    const dispatchExpoToken = useContext(ExpoPushTokenContext)
    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            dispatchExpoPushToken({ type: "create", payload: token });
        }).catch((err) => { alert(err) })


        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => { });
        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        }
    }, []);
    return (
        <View>
        </View>
    );
}
export default Notification