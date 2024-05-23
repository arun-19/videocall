import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import  { Component } from 'react';
import admin from "@react-native-firebase/messaging"
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import requestMicrophonePermission from '../Notification/VoicePermission';
import { mediaDevices } from 'react-native-webrtc';
import ZegoUIKit from '@zegocloud/zego-uikit-rn';
import firestore from "@react-native-firebase/firestore"
import { v4 as uuidv4 } from 'uuid'
import fcmNotify from '../Notification/fcmNotify';

const serverKey = 'AAAAneEidBM:APA91bF-5p1uXIQIdgVbCN181v3A3RS_wD0KLEs-Xlta7nqsdsIJG7qjhIX2STHTFlNZxHq2b0vP0wSD8hEeLRmnZXbReOXuTJE7e7S1kdq4JWP5pEBXWqnVOfpkGDUKNQdCSPccUrCh'; // Replace with your Firebase server key
 

function CallPage(props) {
  const name=props.route.params?.name
  const id=props.route.params?.id
  const callertoken=props.route.params?.callertoken
  const roomUUID=props.route.params?.roomUUID

  useEffect(()=>{
    mediaDevices.getUserMedia({audio:true,video:false})
 // requestMicrophonePermission()
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
                isAudioEnabled={true}  // Enable audio
                isVideoEnabled={true}
                callID={id} // callID can be any unique string. 
                config={{
                ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                audio: true,
                video: true, 
                onOnlySelfInRoom: () => { 
                  
                  
                  mediaDevices.getUserMedia({audio:false,video:false})
                  props.navigation.navigate('Home') },
                    onHangUp: () => { 
                     
                      props.navigation.navigate('Home') },
                }}
            />
</View>

  )
}

export default CallPage