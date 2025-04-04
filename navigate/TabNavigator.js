import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IndexPage from '../page/IndexPage';
import PersonalPage from '../page/PersonalPage';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#DDE2E6",
                    height: 60,
                    paddingBottom: 10,
                }
            }}
        >
            <Tab.Screen
                name="IndexPage"
                component={IndexPage}
                options={{
                    tabBarLabel: "trang chủ",
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name={"home"} size={size} color={color} />;
                    },
                }}
            />
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