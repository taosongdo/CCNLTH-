import React, { useState, useContext, useEffect } from "react"
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert, Text } from "react-native"
import TouchButton from "../components/TouchButton"
import InputBar from "../components/InputBar"
import key from "../util/key"
import axios from "axios"
import url from "../util/url"
import LoadPage from "../components/LoadPage"
import { userContext } from "../App"
import DropDownPicker from "react-native-dropdown-picker"
import Avatar from "../components/Avatar"
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";

const LoginPage = ({ navigation }) => {
    const navigationHook = useNavigation();

    const [username, setUsername] = useState("TuanApplicant")
    const [password, setPassword] = useState("123")

    const [avatar, setAvatar] = useState(null)
    const [passwordReenter, setPasswordReenter] = useState()
    const [gmail, setGmail] = useState(null)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [gender, setGender] = useState(true)
    const [phoneNumber1, setPhoneNumber1] = useState(0)
    const [phoneNumber2, setPhoneNumber2] = useState(0)
    const [backChecking, setBackChecking] = useState(0)

    const [loading, setLoading] = useState(false)
    const [checkLogin, setCheckLogin] = useState(true)

    const [userRoleList, setUserRoleList] = useState(
        [
            { label: "người ứng tuyển", value: 1 },
            { label: "nhà tuyển dụng", value: 2 }
        ]
    )
    const [openUserRole, setOpenUserRole] = useState(false)
    const [userRoleValue, setUserRoleValue] = useState(null)

    const { setToken, setRole } = useContext(userContext)

    const login = async () => {
        try {
            const formData = new FormData()
            formData.append("grant_type", "password")
            formData.append("username", username)
            formData.append("password", password)
            formData.append("client_id", key.CLIENT_ID)
            formData.append("client_secret", key.CLIENT_SECRET)
            setLoading(true)
            const res = await axios.post(`${url.domainName}/o/token/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setToken(res.data.access_token)
            setRole(res.data.role)
            setBackChecking(backChecking + 1)
        }
        catch (err) {
            console.log(err)
            Alert.alert("thông báo", "tài khoản hoặc mật khẩu không đúng!")
        }
        finally {
            setLoading(false)
        }

    }
    const register = async () => {
        try {
            if (password === passwordReenter) {
                const formData = new FormData()
                formData.append("username", username)
                formData.append("password", password)
                formData.append("email", gmail)
                formData.append("first_name", firstName)
                formData.append("last_name", lastName)
                formData.append("gender", gender)
                formData.append("role", userRoleValue)
                if (avatar) {
                    formData.append('avatar', {
                        uri: avatar,
                        name: 'avatar.jpg', // Đặt tên file
                        type: 'image/jpeg' // Kiểu MIME của ảnh
                    });
                }
                formData.append("phone_number_1", phoneNumber1)
                if (phoneNumber2) {
                    formData.append("phone_number_2", phoneNumber2)
                }
                setLoading(true)
                const res = await axios.post(`${url.domainName}/users/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                Alert.alert("thông báo", "tạo tài khoản thành công")
                setCheckLogin(true)
            }
            else {
                Alert.alert("thông báo", "mật khẩu không trùng khớp!")
            }
        }
        catch (err) {
            Alert.alert("thông báo", JSON.stringify(err.response.data))
        }
        finally {
            setLoading(false)
        }

    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };
    const checkLoginHandler = () => {
        setCheckLogin(!checkLogin)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            e.preventDefault();
            if (!(loading)) {
                navigation.dispatch(e.data.action);
            }
        })
        if (!loading && backChecking) {
            setBackChecking(backChecking + 1)
        }
        return unsubscribe
    }, [loading])
    useEffect(() => {
        if (backChecking == 2) {
            navigationHook.goBack()
        }
    }, [backChecking])
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Cần cấp quyền!", "Ứng dụng cần quyền truy cập ảnh.");
            }
        })();
    }, []);

    if (loading) {
        return <LoadPage />
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.viewLoginPage}>
                <View style={styles.formLogin}>
                    {!checkLogin &&
                        <>
                            <Avatar image={avatar} />
                            <TouchButton title="chọn ảnh" backgroundColor={"red"} pressHandler={pickImage} />
                        </>
                    }
                    <InputBar value={username} TextChangeHandler={setUsername} placeholder={"tài khoản"} />
                    <InputBar value={password} TextChangeHandler={setPassword} placeholder={"mật khẩu"} secureTextEntry={true} />

                    {checkLogin ?
                        <>
                            <TouchButton title="đăng nhập" backgroundColor={"blue"} pressHandler={login} />
                            <View style={styles.line} />
                            <Text style={styles.textNot}>chưa có tài khoản ?</Text>
                            <TouchButton title="đăng ký" backgroundColor={"green"} pressHandler={checkLoginHandler} />
                        </> :
                        <>
                            {password !== passwordReenter && <Text style={[{ color: "red" }, styles.textNot]}>mật khẩu và xác nhận ko giống nhau</Text>}
                            <InputBar value={passwordReenter} TextChangeHandler={setPasswordReenter} placeholder={"nhập lại mật khẩu"} secureTextEntry={true} />
                            <InputBar value={gmail} TextChangeHandler={setGmail} placeholder={"gmail"} keyboardType={"email-address"} />
                            <View style={styles.viewGroup}>
                                <View style={styles.view1on3}>
                                    <InputBar value={firstName} TextChangeHandler={setFirstName} placeholder={"tên"} />
                                </View>
                                <View style={styles.view1on3}>
                                    <InputBar value={lastName} TextChangeHandler={setLastName} placeholder={"họ và tên lót"} />
                                </View>
                                <View style={styles.view1on3}>
                                    <TouchButton title={gender ? "nam" : "nữ"} backgroundColor={gender ? "lightblue" : "pink"} pressHandler={() => { setGender(!gender) }} />
                                </View>
                            </View>
                            <Text style={styles.textNot}>
                                số điện thoại 2 là tùy chọn
                            </Text>
                            <View style={styles.viewGroup}>
                                <View style={styles.viewHalf}>
                                    <InputBar value={phoneNumber1} TextChangeHandler={setPhoneNumber1} keyboardType="numeric" placeholder={"số điện thoại 1"} />
                                </View>
                                <View style={styles.viewHalf}>
                                    <InputBar value={phoneNumber2} TextChangeHandler={setPhoneNumber2} keyboardType="numeric" placeholder={"số điện thoại 2"} />
                                </View>
                            </View>
                            <DropDownPicker
                                style={[styles.list, styles.districtList]}

                                open={openUserRole}
                                setOpen={setOpenUserRole}

                                value={userRoleValue}
                                setValue={setUserRoleValue}

                                items={userRoleList}

                                placeholder="người ứng tuyển"

                            />
                            <TouchButton title="đăng ký" backgroundColor={"green"} pressHandler={register} />
                            <View style={styles.line} />
                            <Text style={styles.textNot}>đã có tài khoản ?</Text>
                            <TouchButton title="đăng nhập" backgroundColor={"blue"} pressHandler={checkLoginHandler} />
                        </>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>)
}
export default LoginPage

const styles = StyleSheet.create({
    viewLoginPage: {
        backgroundColor: "#F5F7FA",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textNot: {
        marginBottom: 10
    },
    viewGroup: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    viewHalf: {
        width: '45%'
    },
    formLogin: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#DDE2E6",
        alignItems: "center",
        width: 350
    },
    view1on3: {
        width: '30%'
    },
    list: {
        backgroundColor: '#F5F7FA',
        borderRadius: 10,
        borderWidth: 0,
        marginBottom: 10,
    },
    citiesList: {
        zIndex: 2
    },
    districtList: {
        zIndex: 1
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'gray',
        marginBottom: 5,
        marginTop: 5
    }

})