import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IndexPage from '../components/Home/IndexPage';
import PersonalPage from '../components/User/PersonalPage';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../Styles';
import ChatList from '../components/Chat/ChatList';
import { useContext } from 'react';
import { UserContext } from '../config/AppContext';
const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    const { access_token } = useContext(UserContext)
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: "gray",
                tabBarStyle: [Styles.bgColorBFDBFE, Styles.h60]
            }}
        >

            <Tab.Screen
                name="IndexPage"
                component={IndexPage}
                options={{
                    tabBarLabel: "trang chat",
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name={"home"} size={size} color={color} />;
                    },
                }}
            />
            {
                access_token &&
                <Tab.Screen
                    name="ChatList"
                    component={ChatList}
                    options={{
                        tabBarLabel: "trang chat",
                        tabBarIcon: ({ color, size }) => {
                            return <AntDesign name={"message1"} size={size} color={color} />;
                        },
                    }}
                />
            }
            <Tab.Screen
                name="PersonalPage"
                component={PersonalPage}
                options={{
                    tabBarLabel: "trang cá nhân",
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome6 name={"user"} size={size} color={color} />;
                    },
                }}
            />

        </Tab.Navigator>
    )
}
export default TabNavigator