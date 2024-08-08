import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screen/Home';
import MovieScreen from '../screen/MovieScreen';
import PersonScreen from '../screen/PersonScreen';
import SearchScreen from '../screen/SearchScreen';
import CategoryScreen from '../screen/CategoryScreen';
import ReproductorVideo from '../screen/Reproductor';
import { View } from 'react-native';


const Stack = createNativeStackNavigator(); 
// const Drawer = createDrawerNavigator();
  const AppNavigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="HomeTabs"
            component={HomeScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Movie" options={{ headerShown: false }}  component={MovieScreen} />
          <Stack.Screen name="Person" options={{ headerShown: false }}  component={PersonScreen} />
          <Stack.Screen name="Search" options={{ headerShown: false }}  component={SearchScreen} />
          <Stack.Screen name="Category" options={{ headerShown: false }}  component={CategoryScreen} />
          <Stack.Screen name="Reproductor" options={{ headerShown: false }}  component={ReproductorVideo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default AppNavigation;