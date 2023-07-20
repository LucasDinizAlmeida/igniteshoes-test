import { useEffect } from 'react';

import OneSignal from 'react-native-onesignal';
import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate, tagUserInfoDelete } from './src/notifications/notificationsTags';
import { registerRootComponent } from 'expo';

OneSignal.setEmail('almeidalucas@example.com')

const oneSignalId = Platform.OS === 'ios'? 'id-ios' : 'c12ef595-dd41-4ec5-85ba-3da119c09233'
OneSignal.setAppId(oneSignalId);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(() => {
    const onSubscribe = OneSignal.setNotificationOpenedHandler((response) => {

      const { actionId } = response.action as any

      switch (actionId) {
        case '1':
          return console.log('Ver todos')
        case '2':
          return console.log('Ver agora')
        default:
          break
      }
    })

    return () => onSubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
      
    </NativeBaseProvider>
  );
}