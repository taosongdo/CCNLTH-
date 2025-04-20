import { useReducer, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from './navigate/StackNavigator';
import Styles from './Styles';
import Notification from './components/Notification/Notification';
import UserReducer from './components/Reducer/UserReducer';
import { ExpoPushTokenContext, UserContext, UserDispatchContext, ExpoPushTokenDispatchContext } from './config/AppContext';
import ExpoPushTokenReducer from './components/Reducer/ExpoPushTokenReducer';
import { useRef } from 'react';



export default function App() {
  const [user, dispatchUser] = useReducer(UserReducer, { "_j": {} })
  const [expoPushToken, dispatchExpoPushToken] = useReducer(ExpoPushTokenReducer, { "_j": null })
  return (
    <SafeAreaView style={Styles.flex1}>
      <UserContext.Provider value={user._j} >
        <UserDispatchContext.Provider value={dispatchUser}>
          <ExpoPushTokenContext.Provider value={expoPushToken._j}>
            <ExpoPushTokenDispatchContext.Provider value={dispatchExpoPushToken}>
              <Notification />
              <StackNavigator />
            </ExpoPushTokenDispatchContext.Provider>
          </ExpoPushTokenContext.Provider>
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    </SafeAreaView >
  );
}

