import React, { useState, useContext, useEffect } from "react"
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert, Text, Image } from "react-native"
import TouchButton from "../TouchButton"
import InputBar from "../InputBar"
import key from "../../config/key"
import LoadPage from "../LoadPage"
import { userContext } from "../../App"
import DropDownPicker from "react-native-dropdown-picker"
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import Styles from "../../Styles"
import Apis, { endpoints } from '../../config/Apis'
import Notification from "../Notification/Notification"

const LoginPage = ({ navigation }) => {
    const navigationHook = useNavigation();

    const [username, setUsername] = useState("TuanEmployer")
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

    const { setToken, setRole, expoToken } = useContext(userContext)

    const login = async () => {
        try {
            const formData = new FormData()
            formData.append("grant_type", "password")
            formData.append("username", username)
            formData.append("password", password)
            formData.append("client_id", key.CLIENT_ID)
            formData.append("client_secret", key.CLIENT_SECRET)
            formData.append("expo_token", expoToken)
            setLoading(true)
            const res = await Apis.post(`/o/token/`, formData, {
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
                const res = await Apis.post(endpoints['users'], formData, {
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
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.flex1, Styles.bgColorBFDBFE]}>
                    <View style={[styles.formLogin, Styles.borderRadius20, Styles.alignItemsCenter, Styles.bgColorF8FAFC, Styles.p10]}>
                        {!checkLogin &&
                            <>
                                <View style={[Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.w100per, Styles.p10]}>
                                    <Image style={[Styles.w150, Styles.borderRadius100, Styles.h150]} source={{ uri: avatar ? avatar : "https://res.cloudinary.com/dx6brcofe/image/upload/v1736245841/woxspsofipalpoz8r4aj.jpg" }} />
                                </View>
                                <TouchButton title="chọn ảnh" backgroundColor={"red"} pressHandler={pickImage} />
                            </>
                        }
                        <View style={[Styles.w100per, Styles.marginBottom10]}>
                            <InputBar value={username} TextChangeHandler={setUsername} placeholder={"tài khoản"} />
                        </View>
                        <View style={[Styles.w100per, Styles.marginBottom10]}>
                            <InputBar value={password} TextChangeHandler={setPassword} placeholder={"mật khẩu"} secureTextEntry={true} />
                        </View>

                        {checkLogin ?
                            <>
                                <View style={Styles.w150}>
                                    <TouchButton title="đăng nhập" backgroundColor={"blue"} pressHandler={login} />
                                </View>
                                <View style={[styles.line, Styles.w100per]} />
                                <Text style={[Styles.marginBottom10]}>chưa có tài khoản ?</Text>
                                <View style={Styles.w150}>
                                    <TouchButton title="đăng ký" backgroundColor={"green"} pressHandler={checkLoginHandler} />
                                </View>
                            </> :
                            <>
                                {password !== passwordReenter && <Text style={[{ color: "red" }, Styles.marginBottom10]}>mật khẩu và xác nhận ko giống nhau</Text>}
                                <View style={[Styles.w100per, Styles.marginBottom10]}>
                                    <InputBar value={passwordReenter} TextChangeHandler={setPasswordReenter} placeholder={"nhập lại mật khẩu"} secureTextEntry={true} />
                                </View>
                                <View style={[Styles.w100per, Styles.marginBottom10]}>
                                    <InputBar value={gmail} TextChangeHandler={setGmail} placeholder={"gmail"} keyboardType={"email-address"} />
                                </View>
                                <View style={[Styles.flexDirectionRow, Styles.justifyContentBetween, Styles.w100per]}>
                                    <View style={Styles.w30per}>
                                        <InputBar value={firstName} TextChangeHandler={setFirstName} placeholder={"tên"} />
                                    </View>
                                    <View style={Styles.w30per}>
                                        <InputBar value={lastName} TextChangeHandler={setLastName} placeholder={"họ và tên lót"} />
                                    </View>
                                    <View style={Styles.w30per}>
                                        <TouchButton title={gender ? "nam" : "nữ"} backgroundColor={gender ? "lightblue" : "pink"} pressHandler={() => { setGender(!gender) }} />
                                    </View>
                                </View>
                                <Text style={Styles.marginBottom10}>
                                    số điện thoại 2 là tùy chọn
                                </Text>
                                <View style={[Styles.flexDirectionRow, Styles.w100per, Styles.justifyContentBetween, Styles.marginBottom10]}>
                                    <View style={Styles.w48per}>
                                        <InputBar value={phoneNumber1} TextChangeHandler={setPhoneNumber1} keyboardType="numeric" placeholder={"số điện thoại 1"} />
                                    </View>
                                    <View style={Styles.w48per}>
                                        <InputBar value={phoneNumber2} TextChangeHandler={setPhoneNumber2} keyboardType="numeric" placeholder={"số điện thoại 2"} />
                                    </View>
                                </View>
                                <DropDownPicker
                                    style={[styles.list, Styles.marginBottom10, Styles.borderRadius10, Styles.bgColorF8FAFC, styles.districtList]}

                                    open={openUserRole}
                                    setOpen={setOpenUserRole}

                                    value={userRoleValue}
                                    setValue={setUserRoleValue}

                                    items={userRoleList}

                                    placeholder="người ứng tuyển"

                                />
                                <TouchButton title="đăng ký" pressHandler={register} />
                                <View style={[styles.line, Styles.w100per]} />
                                <Text style={Styles.marginBottom10}>đã có tài khoản ?</Text>
                                <TouchButton title="đăng nhập" pressHandler={checkLoginHandler} />
                            </>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}
export default LoginPage

const styles = StyleSheet.create({
    formLogin: {
        width: 350
    },
    list: {
        borderWidth: 0,
    },
    citiesList: {
        zIndex: 2
    },
    districtList: {
        zIndex: 1
    },
    line: {
        height: 1,
        backgroundColor: 'gray',
        marginBottom: 5,
        marginTop: 5
    }

})