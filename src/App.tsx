import { registerRootComponent } from 'expo';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { View } from 'react-native';
import Home from './screens/Home';
import CreateLabel from './screens/labels/CreateLabel';
import ActionWrapper from './screens/actionScreens/ActionWrapper';
import Labels from './screens/labels/Labels';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Header';
import { styles } from './components/utils/react-native-element-dropdown/src/components/TextInput/styles';
import { ScreenIds } from './components/utils/navigation/ScreenIds';
import PastEntries from './screens/historyScreens/PastEntries';
import { useState } from 'react';
import SidePanel from './components/SidePanel';
import MyWeek from './screens/MyWeek';

const Stack = createStackNavigator();
function App() {
  const [sideScreenModal, setSideScreenModal] = useState(false);
  
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

  return (
    <View style={{flex:1}}>
      {
        sideScreenModal && (
          <SidePanel sidePanelCallback={setSideScreenModal} /> 
        )
      }
      <Header menuButtonCallback={setSideScreenModal} />
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName={ScreenIds.home}
          screenOptions={{
            headerShown:false,
          }}
        >
          <Stack.Screen
            name={ScreenIds.home}
            component={Home}
          />
          <Stack.Screen
            name={ScreenIds.labels}
            component={Labels}
          />
          <Stack.Screen
            name={ScreenIds.createLabels}
            component={CreateLabel}
          />
          <Stack.Screen
            name={ScreenIds.actionWrapper}
            component={ActionWrapper}
          />
          <Stack.Screen
            name={ScreenIds.pastEntries}
            component={PastEntries}
          />
          <Stack.Screen
            name={ScreenIds.myWeek}
            component={MyWeek}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

registerRootComponent(App);