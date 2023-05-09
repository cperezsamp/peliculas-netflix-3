import React from 'react';
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


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Image
      style={styles.image}
      source={require(`../assets/images/films/elpadrino.jpeg`)}
    />
  </View>
);

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What do you want to watch?</Text>
      <Text style={styles.title}>*****Space for SearchBox****</Text>

      <FlatList
        numColumns={2}
        data={DATA}
        renderItem={({ item }) => <Item film={item} />}
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