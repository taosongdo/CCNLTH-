import { useState, createContext } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from './navigate/StackNavigator';
import Styles from './Styles';
import Notification from './components/Notification/Notification';


export const userContext = createContext();

export default function App() {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [expoToken, setExpoToken] = useState(null)
  return (
    <SafeAreaView style={Styles.flex1}>
      <userContext.Provider value={{ token, setToken, role, setRole, expoToken, setExpoToken }} style={Styles.flex1}>
        <Notification setExpoToken={setExpoToken} />
        <StackNavigator />
      </userContext.Provider>
    </SafeAreaView>
  );
}

