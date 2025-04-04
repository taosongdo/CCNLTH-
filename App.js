import { useState, createContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from './navigate/StackNavigator';


export const userContext = createContext();

export default function App() {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)

  return (
    <SafeAreaView style={styles.container}>
      <userContext.Provider value={{ token, setToken, role, setRole }} style={{ flex: 1 }}>
        <StackNavigator />

      </userContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
});
