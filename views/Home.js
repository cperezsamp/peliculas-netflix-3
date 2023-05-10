import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { db } from '../config/config_bbdd';
import { collection, onSnapshot, query } from 'firebase/firestore';

const Item = ({ actor, navigation }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{actor.nombre}</Text>
    <Image
      style={styles.image}
      source={actor.imagen}
      onClick={() =>
        navigation.navigate('Detail', { nombre: actor.nombre })
      }
    />
  </View>
);

const Home = ({ navigation }) => {

  const [actores, setActores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const collectionRef = collection(db, 'actores');
    const q = query(collectionRef);
    const unsuscribe = onSnapshot(q, querySnapshot => {
      setLoading(true)
      setActores(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          nombre: doc.data().nombre,
          clip: doc.data().clip,
          edad: doc.data().edad,
          imagen: doc.data().imagen,
          nacionalidad: doc.data().nacionalidad,
          nacionalidad: doc.data().nacionalidad,
          vivo: doc.data().vivo,
        }))
      )
    });

    setLoading(false)
    return unsuscribe;

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> LO QUE EL VIENTO SE LLEVÓ </Text>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.imageFilm}
          source={require("../assets/images/films/loqueelvientosellevo.jpeg")}
        />
      </View>
      <Text style={styles.title}> ACTORES </Text>
      <FlatList
        numColumns={2}
        data={actores}
        renderItem={({ item }) => <Item actor={item} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#1F1F1F",
  },
  imageWrapper: {
    width: "100%",
    height: "50%",
    padding: "10px"
  },
  imageFilm: {
    width: "100%",
    height: "100%",
  },
  flatlist: {
    flexDirection: 'column',
  },
  item: {
    padding: 5,
    margin: 5,
    marginBottom: 15,
    width: 180,
    height: 250
  },
  title: {
    fontSize: 17,
    color: "#E1E1E1",
  },
  image: {
    width: '100%',
    height: 250
  }
});

export default Home;