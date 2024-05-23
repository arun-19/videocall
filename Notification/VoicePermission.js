import { Alert, PermissionsAndroid, Platform } from 'react-native';

async function requestMicrophonePermission() {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
                    title: 'Microphone Permission',
                    message: 'App needs access to your microphone',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert("jkhk", "no")
                console.log('Microphone permission denied');
            } else {
                Alert.alert("jkhk", "hgjj")
            }
        } catch (err) {
            console.warn(err);
        }
    } else {
        // Handle iOS permissions
    }
}

// Call this function when initializing the appexport
export default requestMicrophonePermission