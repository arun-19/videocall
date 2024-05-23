import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function CallWaitingScreen(props) {
    const callid=props.route?.params?.callid
    const name=props.route?.params?.name
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inconing Video Call</Text>

      <Text style={styles.callerName}>{name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.declineButton]}>
          <Icon name="call-end" size={30} color="#fff" />
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.acceptButton]}>
          <Icon name="call" size={30} color="#fff" />
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  callerName: {
    fontSize: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 15,
    marginHorizontal: 10,
  },
  declineButton: {
    backgroundColor: '#d9534f',
  },
  acceptButton: {
    backgroundColor: '#5cb85c',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
});

export default CallWaitingScreen;