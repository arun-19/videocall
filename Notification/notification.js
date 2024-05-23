import notifee, { AndroidCategory, AndroidImportance, AndroidLaunchActivityFlag, AndroidVisibility, EventType, TimeUnit } from '@notifee/react-native';

import { name as appName } from '../app.json';
import Sound from 'react-native-sound';

export async function createCallChannel() {

    await notifee.createChannel({
        id: 'call',
        name: 'Incoming Call Channel',
        importance: AndroidImportance.HIGH,
        sound: "default",

        vibration: true,

    });
}

const handleincomingvideoCall = async(remoteMessage) => {

    await createCallChannel().then(async() => {

        await notifee.displayNotification({
            title: 'Incoming Call',
            body: remoteMessage.data.name + ' calling...',
            data: remoteMessage.data,

            android: {
                pressAction: { id: 'waiting', mainComponent: appName, launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP] },
                channelId: 'call',
                largeIcon: 'https://th.bing.com/th/id/OIP.tlaYbX8A5CfU_fbN_gwtlQHaHa?w=717&h=717&rs=1&pid=ImgDetMain', // URL or local resource
                sound: Sound.DOCUMENT,
                fullScreenAction: {
                    id: 'default'
                },
                ongoing: true,
                visibility: AndroidVisibility.PUBLIC,
                loopSound: true,
                category: AndroidCategory.CALL,
                importance: AndroidImportance.HIGH,
                actions: [{
                        title: 'Answer',
                        pressAction: { id: 'answer', mainComponent: appName, launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP] },
                    },
                    {
                        title: 'Reject',
                        pressAction: { id: 'reject' },
                    },
                ],
                timeoutAfter: 30000
            },
            priority: "low"
        });
    })




}


export const NotifeecancelAllNotification = () => {
    notifee.cancelAllNotifications()
}

export default handleincomingvideoCall