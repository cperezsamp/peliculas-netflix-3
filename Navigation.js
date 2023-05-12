import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Button, View, Text } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './views/Home';
import Detail from './views/Detail';
import Player from './views/Player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = 'home';
                return <Ionicons name={iconName} />;
            },
        })}>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}

function HomeLogo() {
    return (
        <Icon style={{ position: "absolute", left: "150%", top: "-10px" }} name={'home-circle'} color="#E1E1E1" size="34px" onPress={() => { navigation.navigate('Home') }} />
    );
}


function Header() {
    return (
        <View>
            <HomeLogo />

            <Text>TO HOME</Text>
        </View>
    )
}

function HeaderDetails() {
    return (
        <View>
            <Text>TO DETAILS</Text>
            <HomeLogo />

            <Text>TO DETAILS</Text>
        </View>
    )
}

function MyStack() {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#2196F3' } }}>
            <Stack.Screen name='Home' component={Home} options={{ headerTitle: 'Pelicula' }} />
            <Stack.Screen name='Detail' component={Detail} options={{
                headerTitle: 'Detalles',
                headerTitle: () => <Header />
            }} />
            <Stack.Screen name='Player' component={Player} options={{
                headerTitle: 'Player',
                headerTitle: () => <HeaderDetails />
            }} />
        </Stack.Navigator>
    )
}



export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}