import React, { useEffect, useState } from 'react'

import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  firestore  from "@react-native-firebase/firestore"


function Home({navigation}:any) {
  const [name,setname]=useState("")
  const [Callerid,setCallerid]=useState("")
  const [id,setid]=useState("")

 
  useEffect(()=>{
   
 
    AsyncStorage.getItem("user",(err:any,res:any)=>{      
      if(err){
      Alert.alert("error",err)
      }else{
     if(!res){
      navigation.navigate("Login")
     }        
      }
     });

   
  },[])
  
  const gocall=()=>{
    const date=new Date()
    const roomUUID="R"+date.getTime()+""+date.getMinutes()+Math.floor(Math.random()*1000000000*99)+"M"    
  const serverKey = 'AAAAneEidBM:APA91bF-5p1uXIQIdgVbCN181v3A3RS_wD0KLEs-Xlta7nqsdsIJG7qjhIX2STHTFlNZxHq2b0vP0wSD8hEeLRmnZXbReOXuTJE7e7S1kdq4JWP5pEBXWqnVOfpkGDUKNQdCSPccUrCh'; // Replace with your Firebase server key
  
    firestore().collection("Users").where("user","==",Callerid).get().then(requysnap=>{
      requysnap.forEach(data=>{
        if(data.data()){
          firestore().collection("RoomStatus").add({roomUUID:roomUUID,status:1}).then((roomdatas)=>{
          // datas.update({roomdocid:data.id})
            const message = {
              to: data.data().token,
              notification: {
                title: name,
                body:"call...",autoCancel: false, 
              },data:{
               type:"call",name:name,callid:id,token:data.data().token,roomUUID:roomUUID,roomdocid:roomdatas.id
              }, headers: {
                'apns-push-type': 'background',
                'apns-priority': '5',
                'apns-topic': 'call', 
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
            Alert.alert("error",error)
            });            
          }).then(()=>{
      navigation.navigate('Call',{name:name,id:id,callertoken:data.data().token})
      })
        }

        
      })
    })

  }


const styles = StyleSheet.create({container:{
padding:10,margin:10,display:"flex",textAlign:"center",cursor:"pointer"

},
  textInput: {
    height: 50,
    fontSize: 15,
    padding:10,borderRadius:4,
    borderCurve:"circular",
    borderColor:"black",borderWidth:1,
    color: 'black',margin:20
},buttn:{
  backgroundColor:"blue",
  padding:10,
  margin:5
},registerbtn:{
  position:"absolute",right:0,padding:4,backgroundColor:"blue",color:"white"
}
});


  return (
    <View style={styles.container}>
      <Text onPress={()=>navigation.navigate("Register")} style={styles.registerbtn}>Register</Text>
      <Text>Home</Text>
      <TextInput style={styles.textInput}placeholder='Caller ID' onChangeText={(e)=>setCallerid(e)} ></TextInput>
      <TextInput style={styles.textInput}placeholder='name' onChangeText={(e)=>setname(e)} ></TextInput>
       
      <TextInput   style={styles.textInput} placeholder='Id' onChangeText={(e)=>setid(e)} ></TextInput>

      <Button  onPress={gocall} title='Call Now'/>
      
      </View>
  )
}

Home.propTypes = {}

export default Home
