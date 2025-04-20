import React, { useState, useContext, useEffect } from "react"
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert, Text } from "react-native"
import TouchButton from "../TouchButton"
import InputBar from "../InputBar"
import key from "../../config/key"
import LoadPage from "../LoadPage"
import DropDownPicker from "react-native-dropdown-picker"
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import Styles from "../../Styles"
import Apis, { endpoints } from '../../config/Apis'
import Avatar from "../Avatar"
import { ExpoPushTokenContext, UserDispatchContext } from "../../config/AppContext"

const LoginPage = ({ navigation }) => {

    const navigationHook = useNavigation();

    const [user, setUser] = useState({ username: "TuanApplicant", password: "123", gender: true })
    const [openUserRole, setOpenUserRole] = useState(false)
    const [backChecking, setBackChecking] = useState(0)
    const [loading, setLoading] = useState(false)
    const [checkLogin, setCheckLogin] = useState(true)

    const dispatchUser = useContext(UserDispatchContext)
    const expoPushToken = useContext(ExpoPushTokenContext)

    const changeOptionLogin = () => {
        setCheckLogin(!checkLogin)
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setUser({ ...user, avatar: result.assets[0].uri });
        }
    };
    const userRoleList = [
        { label: "người ứng tuyển", value: 1 },
        { label: "nhà tuyển dụng", value: 2 }
    ]
    const registerList = [{
        name: 'chọn ảnh',
        type: 'button',
        pressHandler: pickImage
    }, {
        key: 'username',
        type: 'input',
        placeholder: 'tài khoản'
    }, {
        key: 'password',
        type: 'input',
        placeholder: 'mật khẩu',
        secureTextEntry: true
    }, {
        type: 'text',
        value: 'mật khẩu và xác nhận không giống nhau',
        color: 'red',
        show: user.password !== user.password_reenter,

    }, {
        key: 'password_reenter',
        type: 'input',
        placeholder: 'nhập lại mật khẩu',
        secureTextEntry: true
    }, {
        key: 'email',
        type: 'input',
        placeholder: 'nhập gmail'
    }, {
        type: 'list',
        length: 3,
        data: [
            {
                key: 'first_name',
                type: 'input',
                placeholder: 'nhập tên'
            }, {
                key: 'last_name',
                type: 'input',
                placeholder: 'nhập họ'
            }, {
                name: 'gender',
                type: 'button',
                pressHandler: () => {
                    setUser({ ...user, gender: !(user.gender) })
                }
            }
        ]
    }, {
        type: 'text',
        value: 'số điện thoại 2 tùy chọn',
        color: 'black',
        show: true
    }, {
        type: 'list',
        length: 2,
        data: [
            {
                key: 'phone_number_1',
                type: 'input',
                placeholder: 'nhập số điện 1',
                keyboardType: 'numeric'
            }, {
                key: 'phone_number_2',
                type: 'input',
                placeholder: 'nhập số điện 2',
                keyboardType: 'numeric'
            }]
    },
    {
        type: 'dropDownList',
        open: openUserRole,
        setOpen: setOpenUserRole,
        value: user.userRoleValue,
        setValue: (test) => {
            setUser({ ...user, userRoleValue: test() })
        },
        items: userRoleList
    },
    {
        name: 'đăng ký',
        type: 'button',
        pressHandler: async () => {
            try {
                setLoading(true)
                if (user.password === user.password_reenter) {
                    const formData = new FormData()
                    for (let key in user) {
                        if (key === 'avatar') {
                            if (user.avatar) {
                                formData.append(key,
                                    {
                                        uri: user.avatar,
                                        name: 'avatar.png',
                                        type: 'png/jpg'
                                    })
                            }
                        }
                        else {
                            formData.append(key, user[key])
                        }
                    }
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
    }, {
        type: 'text',
        value: 'chưa có tài khoản ?',
        color: 'black',
        show: true
    }, {
        name: 'đăng nhập',
        type: 'button',
        pressHandler: changeOptionLogin
    }]

    const loginList = [{
        key: 'username',
        type: 'input',
        placeholder: 'tài khoản'
    }, {
        key: 'password',
        type: 'input',
        placeholder: 'mật khẩu',
        secureTextEntry: true
    }, {
        name: 'đăng nhập',
        type: 'button',
        pressHandler: async () => {
            try {
                setLoading(true)
                const formData = new FormData()
                formData.append("grant_type", "password")
                formData.append("username", user.username)
                formData.append("password", user.password)
                formData.append("client_id", key.CLIENT_ID)
                formData.append("client_secret", key.CLIENT_SECRET)
                formData.append("expo_token", expoPushToken)

                const res = await Apis.post(endpoints['login'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                dispatchUser({ type: "login", payload: res.data })
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
    },
    {
        type: 'text',
        value: 'chưa có tài khoản ?',
        color: 'black',
        show: true
    },
    {
        name: 'đăng ký',
        type: 'button',
        pressHandler: changeOptionLogin
    }]

    const valueChangeHandler = (key, value) => {
        setUser({ ...user, [key]: value })
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
                        {checkLogin ?
                            <>
                                {
                                    loginList.map((item, index) => {

                                        if (item.type === 'input') {
                                            return (
                                                <View key={index} style={[Styles.w100per, Styles.marginBottom10]}>
                                                    <InputBar value={user[item.key]} secureTextEntry={item.secureTextEntry} TextChangeHandler={(text) => { valueChangeHandler(item.key, text) }} placeholder={"tài khoản"} />
                                                </View>
                                            )
                                        }
                                        else if (item.type === 'button') {
                                            return (
                                                <View key={index} style={[Styles.w150, Styles.marginBottom10]}>
                                                    <TouchButton title={item.name} pressHandler={item.pressHandler} />
                                                </View>
                                            )
                                        }
                                        else if (item.type === 'text') {
                                            return (
                                                <Text key={index} style={[Styles.marginBottom10]}>chưa có tài khoản ?</Text>
                                            )
                                        }

                                    })
                                }
                            </> :
                            <>
                                <Avatar avatar={user.avatar} />
                                {registerList.map((item, index) => {
                                    if (item.type === 'button') {
                                        return (
                                            <View key={index} style={[Styles.marginBottom10, Styles.w100per]}>
                                                <TouchButton title={item.name} pressHandler={item.pressHandler} />
                                            </View>

                                        )
                                    }
                                    else if (item.type === 'input') {
                                        return (
                                            <View key={index} style={[Styles.w100per, Styles.marginBottom10]}>
                                                <InputBar
                                                    secureTextEntry={item.secureTextEntry}
                                                    value={user[item.key]}
                                                    TextChangeHandler={(text) => { valueChangeHandler(item.key, text) }}
                                                    placeholder={item.placeholder}
                                                    keyboardType={item.keyboardType}
                                                />
                                            </View>
                                        )
                                    }
                                    else if (item.type === 'list') {
                                        return (
                                            <View key={index} style={[Styles.flexDirectionRow, Styles.justifyContentBetween, Styles.w100per, Styles.marginBottom10]}>
                                                {
                                                    item.data.map((subItem, index) => {
                                                        if (subItem.type === 'input') {
                                                            return (
                                                                <View key={index + 10} style={item.length == 3 ? Styles.w30per : Styles.w48per}>
                                                                    <InputBar keyboardType={subItem.keyboardType} value={user[subItem.key]} TextChangeHandler={(text) => valueChangeHandler(subItem.key, text)} placeholder={subItem.placeholder} />
                                                                </View>
                                                            )
                                                        }
                                                        else if (subItem.type === 'button') {
                                                            return (
                                                                <View key={index + 10} style={item.length == 3 ? Styles.w30per : Styles.w48per}>
                                                                    <TouchButton title={user.gender ? 'nam' : 'nữ'} pressHandler={subItem.pressHandler} />
                                                                </View>
                                                            )
                                                        }
                                                    })
                                                }
                                            </View>

                                        )
                                    }
                                    else if (item.type === 'text') {
                                        if (item.show) {
                                            return (
                                                <Text key={index} style={[Styles.marginBottom10, { color: item.color }]}>
                                                    {item.value}
                                                </Text>
                                            )
                                        }
                                    }
                                    else if (item.type === 'dropDownList') {
                                        return (
                                            <>
                                                <DropDownPicker key={index}
                                                    style={[styles.list, Styles.marginBottom10, Styles.borderRadius10, Styles.bgColorBFDBFE, styles.districtList]}
                                                    open={item.open}
                                                    setOpen={item.setOpen}
                                                    value={item.value}
                                                    setValue={item.setValue}
                                                    items={item.items}
                                                />
                                            </>
                                        )
                                    }
                                })}
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