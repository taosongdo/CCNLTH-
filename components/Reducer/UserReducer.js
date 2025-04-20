import AsyncStorage from '@react-native-async-storage/async-storage';

const UserReducer = async (current, action) => {
    
    switch (action.type) {
        case "login":
            return action.payload
        case "logout":
            await AsyncStorage.removeItem("token")
            return {}
        default:
            return {}
    }
}

export default UserReducer