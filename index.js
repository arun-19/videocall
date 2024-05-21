/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from "@react-native-firebase/messaging"
import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { Platform, Linking } from 'react-native';

AppRegistry.registerComponent(appName, () => App);




messaging().setBackgroundMessageHandler(async remoteMessage => {
    await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: 'calling...',
        android: {
            channelId: 'call',
            largeIcon: 'https://th.bing.com/th/id/OIP.tlaYbX8A5CfU_fbN_gwtlQHaHa?w=717&h=717&rs=1&pid=ImgDetMain', // URL or local resource
            sound: 'default',
            fullScreenAction: {
                id: 'default'
            },
            ongoing: true,
            visibility: AndroidVisibility.PUBLIC,
            importance: AndroidImportance.HIGH,
            actions: [{
                    title: 'Answer',
                    pressAction: { id: 'answer', value: { callid: remoteMessage.data.callid } },
                },
                {
                    title: 'Reject',
                    pressAction: { id: 'reject' },
                },
            ],
        }
    });
});

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => async(remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);

});



notifee.onBackgroundEvent(async({ type, detail }) => {
    switch (type) {
        case EventType.ACTION_PRESS:
            if (detail.pressAction.id === 'answer') {
                Linking.openURL('videoCallApp://');
                console.log(detail);
            } else if (detail.pressAction.id === 'reject') {


            }
            break;
    }
});

notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
        case EventType.ACTION_PRESS:
            if (detail.pressAction.id === 'answer') {
                // Handle the answer action
                Linking.openURL('videocallapp://');
                console.log(detail);
                // Navigate to call screen or perform other actions
            } else if (detail.pressAction.id === 'reject') {
                // Handle the reject action
                console.log('Call rejected');
                // Perform call rejection actions
            }
            break;
    }
});