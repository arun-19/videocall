import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  { Component } from 'react';
import admin from "@react-native-firebase/messaging"
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import requestMicrophonePermission from '../Notification/VoicePermission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MediaStream, MediaStreamTrack, mediaDevices } from 'react-native-webrtc';
import { ZegoMediaPlayer } from 'zego-express-engine-reactnative';



function CallView(props) {
  const name=props.route.params?.name
  const id=props.route.params?.callid
  const [ownname,setownname]=useState("user")

useEffect(()=>{
  (async ()=>{await AsyncStorage.getItem("user",async (err,res)=>{      
    if(err){
    Alert.alert("error",err)
    }else{
   if(res){
  await  setownname(res)
    
   }        
    }
   });
  })
 

requestMicrophonePermission()


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
  <Text>call</Text>
    <ZegoUIKitPrebuiltCall
                 appID={86568963}
                 appSign={'36cdde30bd0ab6eca6af412d454b7b199b21fa52a9645fce8b9a856eef165d45'}
                userID={ownname} // userID can be something like a phone number or the user id on your own user system. 
                userName={ownname}
                callID={id} // callID can be any unique string. 
                config={{
                ...ONE_ON_ONE_VIDEO_CALL_CONFIG
                ,
                audio: true,
                video: true, 
                onOnlySelfInRoom: () => { 
                 mediaDevices.getUserMedia({audio:false,video:false})
                  props.navigation.navigate('Home') },
                    onHangUp: () => { props.navigation.navigate('Home') },
                }}
            />
</View>

  )
}

export default CallView