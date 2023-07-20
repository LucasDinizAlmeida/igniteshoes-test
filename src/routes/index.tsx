import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

import { Notification } from '../components/Notification';

const linking = {
  prefixes: ['com.lucasdev.igniteshoes://', 'igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {

  const [notification, setNotification] = useState<OSNotification | null>(null)
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const onSubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification()
        setNotification(response)
      })

      return () => onSubscribe
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {
        notification &&
        <Notification 
          data={notification}
          onClose={() => setNotification(null)}/>
      }
    </NavigationContainer>
  );
}