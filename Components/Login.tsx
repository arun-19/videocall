import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore"
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { ScreenContainer } from "react-native-screens";

function Login({navigation}:any){
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

    const onlogin=()=>{



        firestore()
        .collection('Users').where("user","==",name)
        .get()
        .then(querySnapshot => {
            
            
          if(querySnapshot.size==0){
        /*    firestore()
            .collection('Users').add({user:name,password:pass})
            */
          }else{
            querySnapshot.forEach((pass)=>{
               
              if(  pass.data().password==passw){
                AsyncStorage.setItem("user",name)
                navigation.navigate("Home");
                
              }
                

            })
            
        
          }
      
        });
      
    }
    return (
       
        <View style={style.Container}>
            
            <TextInput placeholder="name" aria-label="name" onChangeText={(text)=>setname(text)}/>
            <TextInput placeholder="password" aria-label="password" onChangeText={(text)=>setpass(text)}/>
            <Button onPress={onlogin} title="login"/>
        </View>
      
    )

}



export default Login