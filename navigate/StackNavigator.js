import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import LoginPage from "../page/LoginPage";
import CVPage from "../page/CVPage";
import CVCreatorPage from "../page/CVCreatorPage";
import CVExperienceCreatorPage from "../page/CVExperiencePage";
import EducationLevelPage from "../page/EducationLevelPage";
const StackNavigator = () => {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="TabNavigator"
                    options={{ headerShown: false }}
                    component={TabNavigator}
                />
                <Stack.Screen
                    name="LoginPage"
                    options={{ headerShown: false }}
                    component={LoginPage}
                />
                <Stack.Screen
                    name="trang CV"
                    component={CVPage}
                />
                <Stack.Screen
                    name="trang tạo CV"
                    component={CVCreatorPage}
                />
                <Stack.Screen
                    name="trang thêm kinh nghiệm"
                    component={CVExperienceCreatorPage}
                />
                <Stack.Screen
                    name="trang học vấn"
                    component={EducationLevelPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator