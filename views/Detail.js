import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, Button, Modal, Pressable, Alert, Dimensions } from 'react-native';
import { db } from '../config/config_bbdd';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const Detail = ({ navigation, route }) => {
  const [actor, setActor] = useState([]);
  const [actorReady, setActorReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSetActor = (obj) => {
    setActor(obj)
    setActorReady(true)
  }

  useEffect(() => {
    const collectionRef = collection(db, 'actores');
    const q = query(collectionRef, where('nombre', "==", route.params.nombre));
    const unsuscribe = onSnapshot(q, querySnapshot => {
      querySnapshot.docs.map(doc => handleSetActor(({
        id: doc.id,
        nombre: doc.data().nombre,
        clip: doc.data().clip,
        edad: doc.data().edad,
        imagen: doc.data().imagen,
        nacionalidad: doc.data().nacionalidad,
        nacionalidad: doc.data().nacionalidad,
        vivo: doc.data().vivo,
      })))
    });

    return unsuscribe;
  }, [])

  return (
    !actorReady ? <>Loading actor....</> :
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}> Nombre: {actor.nombre}</Text>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.imageActor}
            source={actor.imagen}
            onClick={() => setModalVisible(!modalVisible)}
          />
        </View>
        <Text style={styles.text}> Edad: {actor.edad}</Text>
        <Text style={styles.text}> Nacionalidad: {actor.nacionalidad}</Text>
        <Text style={styles.text}> ¿Está vivo?: {`${actor.vivo ? "Sí" : "No"}`}</Text>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => navigation.navigate('Player', { nombre: actor.nombre })}>
          <Text style={styles.textStyle}>Ver multimedia</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Ver Imagen</Text>
        </Pressable>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}  >
              <Image
                style={styles.imageModal}
                source={actor.imagen}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#1F1F1F",

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#E1E1E1",
  },
  imageWrapper: {
    width: "100%",
    padding: "10px"
  },
  imageActor: {
    width: 250,
    height: 300
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageModal: {
    marginBottom: 15,
    textAlign: 'center',
    width: "100%",
    height: "100%"
  },
})

export default Detail;