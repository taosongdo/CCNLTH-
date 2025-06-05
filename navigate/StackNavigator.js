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
import { UserContext } from "../config/AppContext.js";
import JobPage from "../components/Job/JobPage";
import IndexPage from "../components/Home/IndexPage";
import CVSelectPage from "../components/Job/CVSelectPage";
import ChatPage from "../components/Chat/ChatPage";


const StackNavigator = () => {
    const Stack = createStackNavigator()
    const { access_token, role } = useContext(UserContext)
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
                    name="trang công việc"
                    component={JobPage}
                />
                {access_token &&
                    <>
                        <Stack.Screen
                            name="trang chọn CV"
                            component={CVSelectPage}
                        />
                        <Stack.Screen
                            name="trang CV"
                            component={CVPage}
                        />
                        <Stack.Screen
                            name="trang chat"
                            component={ChatPage}
                            options={{ headerShown: false }}
                        />
                        {
                            role == 1 &&
                            <>
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
                                <Stack.Screen
                                    name="trang danh sách bài đăng"
                                    component={IndexPage}
                                />
                            </>
                        }
                        {
                            role == 2 &&
                            <>
                                <Stack.Screen
                                    name="trang danh sách bài đăng"
                                    component={IndexPage}
                                />
                                <Stack.Screen
                                    name="trang tạo bài đăng công việc"
                                    component={JobPage}
                                />
                            </>
                        }
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator