import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore"
import { useState } from "react";
import { Button, StyleSheet, TextInput, ToastAndroid, View } from "react-native";
import { ScreenContainer } from "react-native-screens";

function Register({navigation}:any){
    const [name,setname]=useState("")
    const [passw,setpass]=useState("")

    const style=StyleSheet.create({
        Container:{
            padding:3,
            margin:2
        },btn:{
            backgroundColor:'none',color:"gray",
            borderBlockColor:"green",borderWidth:3
        }
    })

    const onRegister=()=>{



        firestore()
        .collection('Users').where("user","==",name)
        .get()
        .then(querySnapshot => {
          if(querySnapshot.size==0){
           firestore()
            .collection('Users').add({user:name,password:passw,token:""})
            ToastAndroid.show("Register sucessfully....",1000)
          setname("")
          setpass("")
          }else{
            ToastAndroid.show("Already Register",1000)
          }
      
        });
      
    }
    return (
       
        <View style={style.Container}>
            
            <TextInput placeholder="name" value={name} aria-label="name" onChangeText={(text)=>setname(text)}/>
            <TextInput placeholder="password" value={passw} aria-label="password" onChangeText={(text)=>setpass(text)}/>
            <Button onPress={onRegister} title="Register"/>
        </View>
      
    )

}



export default Register