import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import LoginPage from "../components/User/LoginPage";
import CVPage from "../components/CV/CVPage";
import CVCreatorPage from "../components/CV/CVCreatorPage";
import CVExperienceCreatorPage from "../components/CV/CVExperiencePage";
import EducationLevelPage from "../components/CV/EducationLevelPage";
import JobSearchCriteria from "../components/CV/JobSearchCriteriaPage";
import CVSkillPage from "../components/CV/CVSkillPage";
import { useContext } from "react";
import { userContext } from "../App";
import JobPage from "../components/Job/JobPage";
import IndexPage from "../components/Home/IndexPage";
const StackNavigator = () => {
    const Stack = createStackNavigator()
    const { token, role } = useContext(userContext)
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
                <Stack.Screen
                    name="trang tiêu chí công việc"
                    component={JobSearchCriteria}
                />
                <Stack.Screen
                    name="trang kĩ năng"
                    component={CVSkillPage}
                />
                {
                    role == 2 &&
                    <Stack.Screen
                        name="trang danh sách bài đăng"
                        component={IndexPage}
                    />
                }
                <Stack.Screen
                    name="trang công việc"
                    component={JobPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator