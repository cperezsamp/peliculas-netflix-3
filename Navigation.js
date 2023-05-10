import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './views/Home';
import Detail from './views/Detail';
import Player from './views/Player'; 

const Stack= createNativeStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name='Detail' component={Detail} options={{ headerShown: false }}/>
            <Stack.Screen name='Player' component={Player} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}