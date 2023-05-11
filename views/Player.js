import * as React from 'react';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native';

export default function Player({navigation}) {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
   

      return (
          <View style={styles.container}>
            <Text style={styles.textStyleHead}>Player</Text>
              <Video
              ref={video}
              style={styles.video}
              source={require("../assets/media/ClarkGable.mp4")}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={setStatus}

              />
              <View style={styles.buttons}>

                <Button title="Play from 5s" onPress={()=> video.current.playFromPositionAsync(5000)}/>
                <Button title={status.isLooping ? "Set to not loop": "Set to loop"} onPress={()=> video.current.setIsLoopingAsync(!status.setIsLoopingAsync)}/>
                <Pressable
                  style={[styles.buttonAtras ]}
                  onPress={ ()=> navigation.navigate('Detail')}>
                  <Text style={styles.textStyle}>Atras</Text>
                </Pressable>

              </View>

              
              <StatusBar style="auto" />
          </View>
          


      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
video: {
  flex: 1,
  alignSelf: 'stretch'

},
buttonAtras: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
  width: 150,
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
  textStyleHead: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  
},
button: {
  margin: 16,
  marginBottom:100,
  
}
});