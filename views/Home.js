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
import { DATA } from "./mockData";
import { db } from '../config/config_bbdd';
import { collection, onSnapshot, query } from 'firebase/firestore';

const Item = ({ actor }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{actor.nombre}</Text>
    <Image
      style={styles.image}
      source={actor.imagen}
    />
  </View>
);

const Home = () => {

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


  if (loading) { console.log('LOADING TRUE') }
  if (!loading) { console.log('LOADING FALSE') }

  console.log('actores', actores[0]);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Listado de actores de la Película XXXXX</Text>

      <FlatList
        numColumns={2}
        data={actores}
        renderItem={({ item }) => <Item actor={item} />}
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
    fontSize: 15,
    color: "#E1E1E1"
  },
  image: {
    width: '100%',
    height: 250
  }
});

export default Home;