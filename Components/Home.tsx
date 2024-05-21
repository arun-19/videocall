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
    firestore().collection("Users").where("user","==",Callerid).get().then(requysnap=>{
      requysnap.forEach(data=>{
        navigation.navigate('Call',{name:name,id:id,callertoken:data.data().token})
        
      })
    })

  }


const styles = StyleSheet.create({
  textInput: {
    height: 50,
    fontSize: 15,
    padding:10,borderRadius:4,
    borderCurve:"circular",
    borderColor:"black",borderWidth:1,
    color: 'black',margin:20
},buttn:{
  backgroundColor:"blue",
  padding:5,
  margin:5
}
});


  return (
    <View>
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
