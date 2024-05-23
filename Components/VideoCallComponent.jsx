import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import ZegoExpressEngine  from 'zego-express-engine-reactnative';
const appID = process.env.REACT_NATIVE_APP_ZEGO_APP_ID;
const appSign = process.env.REACT_NATIVE_APP_ZEGO_APP_SIGN;

const VideoCallComponent = ({id,name,callertoken}) => {
  useEffect(() => {
    const engine = new  ZegoExpressEngine(appID,appSign);
  
    const loginRoom = async () => {
      await engine.loginRoom(id, callertoken, { userID: name, userName: name });

      engine.on('roomStreamUpdate', (id, updateType, streamList) => {
        if (updateType === 'ADD') {
          // Handle the addition of new streams
          console.log('New stream added:', streamList);
        } else if (updateType === 'DELETE') {
          // Handle the removal of streams
          console.log('Stream removed:', streamList);
        }
      });
    };

    loginRoom();

    return () => {
      engine.logoutRoom(id);
    };
  }, []);

  return (
    <View>
      <Text>Video Call Component</Text>
    </View>
  );
};

export default VideoCallComponent;