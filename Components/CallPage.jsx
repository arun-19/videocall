import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  { Component } from 'react';
import admin from "@react-native-firebase/messaging"
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'



function CallPage(props) {
  const name=props.route.params.name
  const id=props.route.params.id
  const callertoken=props.route.params.callertoken

  
const serverKey = 'AAAAneEidBM:APA91bF-5p1uXIQIdgVbCN181v3A3RS_wD0KLEs-Xlta7nqsdsIJG7qjhIX2STHTFlNZxHq2b0vP0wSD8hEeLRmnZXbReOXuTJE7e7S1kdq4JWP5pEBXWqnVOfpkGDUKNQdCSPccUrCh'; // Replace with your Firebase server key


  useEffect(()=>{
    
   
const message = {
  to: callertoken,
  notification: {
    title: name,
    body:"call...",
  },data:{
    name:name,callid:id,token:callertoken
  }
};

fetch('https://fcm.googleapis.com/fcm/send', {
  method: 'POST',
  headers: {
    'Authorization': `key=${serverKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(message),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});

  },[])

  const style=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    }
  })
  return (
    <View style={style.container}>
  
    <ZegoUIKitPrebuiltCall
                appID={86568963}
                appSign={'36cdde30bd0ab6eca6af412d454b7b199b21fa52a9645fce8b9a856eef165d45'}
                userID={name} // userID can be something like a phone number or the user id on your own user system. 
                userName={name}
                callID={id} // callID can be any unique string. 
                config={{
                ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onHangUp: () => { props.navigation.navigate('Home') },
                }}
            />
</View>

  )
}

export default CallPage