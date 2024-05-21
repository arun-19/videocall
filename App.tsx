import React, { useEffect, useState } from "react";
import {Alert, NativeModules, PermissionsAndroid, Platform, Text, View} from "react-native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {NavigationContainer} from "@react-navigation/native"
import notifee, { AndroidImportance,AndroidVisibility,EventType } from '@notifee/react-native';
import Home from "./Components/Home";
import uid from "react-native-uuid"
import RNCallKeep from 'react-native-callkeep';
import CallPage from "./Components/CallPage";
import messaging from "@react-native-firebase/messaging"
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from "@react-native-firebase/firestore"
import Login from "./Components/Login";

const Stack=createNativeStackNavigator();
 function App({navigation}:any){
  async function createCallChannel() {
    await notifee.createChannel({
      id: 'call',
      name: 'Incoming Call Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default', 
      vibration: true,
    });
  }

  useEffect(()=>{
    const request=async ()=>{
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    const authStatus = await messaging().requestPermission();
    await notifee.requestPermission();

    try {
    
    } catch (err) {
      console.warn(err);
    }
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      const tk=await messaging().getToken();
      const name=await AsyncStorage.getItem("user")
      
      
     firestore().collection("Users").where("user","==",name).get().then(qv=>{
        qv.forEach((data)=>{
       const token=data.data()
       if(token.token==""){
        firestore().collection("Users").doc(data.id).update({token:tk})
       }
         
        })
    })
      
    }
  }
  request()


  
  

  
  },[])

    
  useEffect(() => {
    messaging().requestPermission();
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    handleincomingvideoCall(remoteMessage)
    });
  
    
    messaging().setBackgroundMessageHandler(async remoteMessage => { 
   handleincomingvideoCall(remoteMessage)
   
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      
      console.log('Notification caused app to open from background state:',remoteMessage.data);
    
    });
try {
  
  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    console.log(remoteMessage); 
    if (remoteMessage) {

      navigation.navigate("Call",remoteMessage)
      console.log(
        'Notification caused app open',
        remoteMessage,
      );
    }
  });
} catch (error) {
  
}




notifee.onBackgroundEvent(async({ type, detail }:any) => {
  switch (type) {
      case EventType.ACTION_PRESS:
          if (detail.pressAction.id === 'answer'){
              console.log(detail);
          } else if (detail.pressAction.id === 'reject') {


          }
          break;
  }
});

notifee.onForegroundEvent(({ type, detail}:any) => {
  switch (type) {
    case EventType.ACTION_PRESS:
      if (detail.pressAction.id === 'answer') {
      
        console.log('Call answered',detail);
      
      } else if (detail.pressAction.id === 'reject') {
        
        console.log('Call rejected');
     
      }
      break;
  }
});

   
  
    return unsubscribe;
  }, []);
 

  const handleincomingvideoCall=async (remoteMessage:any)=>{

    await createCallChannel();

    
    await notifee.displayNotification({
      title: 'Incoming Call',
      body: 'calling...',
      android: {
        channelId: 'call',
        largeIcon: 'https://th.bing.com/th/id/OIP.tlaYbX8A5CfU_fbN_gwtlQHaHa?w=717&h=717&rs=1&pid=ImgDetMain', // URL or local resource
        sound: 'default',
        fullScreenAction: {
          id: 'default'
        },ongoing:true,visibility:AndroidVisibility.PUBLIC,importance:AndroidImportance.HIGH,
        actions: [
          {
            title: 'Answer',
            pressAction: { id: 'answer' },
          },
          {
            title: 'Reject',
            pressAction: { id: 'reject' },
          },
        ],
      }
    });
 

   
    
  }
  


 
 return( 
  
 <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Call" component={CallPage} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
    </NavigationContainer>
    )
}








const options:any = {
  ios: {
    appName: "videoCallApp",
  },
  android: {
    alertTitle: "Permissions required",
    alertDescription:
      "This application needs to ass your phone accounts",
    cancelButton: "Cancel",
    okButton: "ok",
    foregroundService: {
      channelId: 'channelId',
      channelName: 'channelName',
      notificationTitle: 'notificationTitle'
      }
    
  },
};
//RNCallKeep.setup(options);
//RNCallKeep.setAvailable(true);
/*RNCallKeep.addEventListener('didReceiveStartCallAction',({callUUID,handle})=>{
  const notificationPayload = {
    callUUID,
    handle,
    url: 'videoCallApp://open?page=Home'
  };

});*/



export default App;