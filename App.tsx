import React, { useEffect, useState } from "react";
import {Alert, NativeModules, PermissionsAndroid, Platform, Text, View} from "react-native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {NavigationContainer} from "@react-navigation/native"
import notifee from '@notifee/react-native';
import Home from "./Components/Home";
import uid from "react-native-uuid"
import RNCallKeep from 'react-native-callkeep';
import CallPage from "./Components/CallPage";
import messaging from "@react-native-firebase/messaging"
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from "@react-native-firebase/firestore"
import Login from "./Components/Authorization/Login";
import handleincomingvideoCall, { NotifeecancelAllNotification } from "./Notification/notification";

import { navigate,navigationRef } from "./navicationRef";
import CallView from "./Components/CallView";
import CallWaitingScreen from "./Components/callWaitingscreen";
import Register from "./Components/Authorization/Register";
const Stack=createNativeStackNavigator();
 function App({navigation}:any){
 

  const linking = {
    prefixes: ['videocallapp://'],
    config: {
      screens: {
        Home: 'Home',
        CallPage: 'Call/:name/:id',
      },
    },
  };

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
    messaging().onMessageSent(async remoteMessage=>{
    await handleincomingvideoCall(remoteMessage)
    })
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      notifee.cancelTriggerNotifications()
      if(remoteMessage?.data?.type=="reject"){
     NotifeecancelAllNotification()
     }else{
    if(remoteMessage?.data?.type=="call"){
    await handleincomingvideoCall(remoteMessage)
      }

     }
    });
  
    messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
     await  handleincomingvideoCall(remoteMessage)
      }
    });
    
    messaging().onNotificationOpenedApp(async remoteMessage => {
      
     //open      
    
    });
try {
  
 
} catch (error) {
  
}



/*
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
*/

   
  
    return unsubscribe;
  }, []);
 


  


 
 return( 
  
 <NavigationContainer linking={linking} ref={navigationRef}>
     <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Call" options={{headerShown:false}} component={CallPage} />
      <Stack.Screen name="Callwaiting" options={{headerShown:false}}  component={CallWaitingScreen} />
      <Stack.Screen name="CallView" options={{headerShown:false}}  component={CallView} />
      <Stack.Screen name="Login" options={{headerShown:false}}  component={Login} />
      <Stack.Screen name="Register" options={{headerShown:false}}  component={Register} />
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