import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as  React from 'react';
import firestore from '@react-native-firebase/firestore';
import { db } from './config/config_bbdd'; 
import { QuerySnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
//import firestore from '@react-native-firebase/firestore';

class App extends React.Component {
  styles;
  peliculas;
  //setPeliculas;

  constructor(props) {
    super(props); //sobra
    // Initializing the state  //sobra
    this.state = { color: 'lightgreen' }; //sobra

    this.styles= StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    this.peliculas= [];
  }

  datos= () =>{
    console.log('on datos');
    /*const [peliculas, setPeliculas]= React.useState([]);
    //console.log('En didmount') //se lanza despues de render
    //this.peliculas= await firestore().collection('peliculas').get(); 
    //console.log(this.peliculas);
    React.useEffect( () => {
      const collectionRef = firestore().collection('peliculas');
      const q = query(collectionRef);
      const unsuscribe= onSnapshot(q, querySnapshot => {
        this.setPeliculas(
          querySnapshot.docs.map(doc =>({
            id: doc.id,
            titulo: doc.data().titulo,
          }))
        )
      });
      console.log(peliculas);
      return unsuscribe;
    },[peliculas])*/

  }

  //esto funciona, pero se renderiza con el array vacio
  componentDidMount() {
    const collectionRef = collection(db, 'peliculas');
      const q = query(collectionRef);
      const unsuscribe= onSnapshot(q, querySnapshot => {
        querySnapshot.docs.map(doc =>{
          this.peliculas.push({
            id: doc.id,
            titulo: doc.data().titulo
          })
        })
        console.log(this.peliculas);
        return unsuscribe;
      });  
  }

  render() {
    console.log('RENDER: ', this.peliculas);
    return (
      <View style={this.styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        {this.peliculas.map(pelicula => <Text>{ pelicula.titulo }, { pelicula.id }</Text>)}
        <StatusBar style="auto" />
      </View>
    );
  }
}
export default App;