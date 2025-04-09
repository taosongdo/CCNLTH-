import { useState, createContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from './navigate/StackNavigator';
import Styles from './Styles';


export const userContext = createContext();

export default function App() {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)

  return (
    <SafeAreaView style={Styles.flex1}>
      <userContext.Provider value={{ token, setToken, role, setRole }} style={Styles.flex1}>
        <StackNavigator />

      </userContext.Provider>
    </SafeAreaView>
  );
}

