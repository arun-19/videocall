/**
 * @format
 */

import { Alert, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from "@react-native-firebase/messaging"
import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { Platform, Linking } from 'react-native';
import handleincomingvideoCall, { NotifeecancelAllNotification } from './Notification/notification';
import { navigate } from './navicationRef';
import
firebase from '@react-native-firebase/firestore';


AppRegistry.registerComponent(appName, () => App);




messaging().setBackgroundMessageHandler(async remoteMessage => {
    notifee.cancelTriggerNotifications()
    if (remoteMessage.data.type ==
        "reject") {
        await NotifeecancelAllNotification()
    } else {
        if (remoteMessage.data && remoteMessage.data.type == "call") {

            await handleincomingvideoCall(remoteMessage)
        }
    }
});



AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => async(remoteMessage) => {

    console.log('Message handled in the background!', remoteMessage);

});



notifee.onBackgroundEvent(async({ type, detail }) => {
    switch (type) {
        case EventType.ACTION_PRESS:
            if (detail.pressAction.id === 'answer') {
                await navigate("CallView", { name: detail.notification.data.name, callid: detail.notification.data.callid })
            } else if (detail.pressAction.id === 'reject') {

                await firebase().collection("RoomStatus").doc(detail.notification.data.roomdocid).update({ status: 0 })
            } else if (detail.pressAction.id == "waiting") {
                await navigate("Callwaiting", { name: detail.notification.data.name, callid: detail.notification.data.callid })


            }
            break;
    }
});

notifee.onForegroundEvent(async({ type, detail }) => {
    switch (type) {
        case EventType.ACTION_PRESS:
            if (detail.pressAction.id === 'answer') {

                setTimeout(() => {
                    navigate("CallView", { name: detail.notification.data.name, callid: detail.notification.data.callid })

                }, 1000)


                // openOtherApp()
                // Navigate to call screen or perform other actions
            } else if (detail.pressAction.id === 'reject') {
                // Handle the reject action
                console.log('Call rejected');
                // Perform call rejection actions
            }
            break;
    }
});
const openOtherApp = async() => {
    const urlScheme = 'whatsapp://send?text=Hello'; // Replace with the actual URL scheme of the app

    try {
        const supported = await Linking.canOpenURL(urlScheme);
        if (supported) {
            await Linking.openURL(urlScheme);
        } else {
            Alert.alert(
                "Cannot Open App",
                "The app is not installed or the URL scheme is incorrect."
            );
        }
    } catch (error) {
        console.error('An error occurred while trying to open the app', error);
        Alert.alert(
            "Error",
            "An error occurred while trying to open the app. Please try again."
        );
    }
};