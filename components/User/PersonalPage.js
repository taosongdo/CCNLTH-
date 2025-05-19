
import { useContext, useEffect, useState, useRef } from "react"
import { View, Text } from "react-native"
import { StyleSheet } from "react-native"
import TouchButton from "../TouchButton"
import InfoBar from "../InfoBar"
import LoadPage from "../LoadPage"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import InputBar from "../InputBar"
import * as DocumentPicker from "expo-document-picker";
import ScrollList from "../ScrollList"
import Styles from "../../Styles"
import Apis, { endpoints } from "../../config/Apis"
import Avatar from "../Avatar"
import { deleteItem } from "../../config/util"
import { UserDispatchContext, UserContext } from "../../config/AppContext"

const PersonalPage = ({ navigation }) => {
    const { access_token, role } = (useContext(UserContext))

    const dispatchUser = useContext(UserDispatchContext)
    const [avatar, setAvatar] = useState(null)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")

    const bottomSheetRef = useRef(null);

    const pressHandler = () => {
        navigation.navigate("LoginPage")
    }
    const cvPressHandler = (params) => {
        navigation.navigate("trang CV", params)
    }
    const createCVPressHandler = () => {
        navigation.navigate("trang tạo CV")
    }

    const deleteItemHandler = async (id) => {
        try {
            await Apis.delete(endpoints['cvs-detail'](id), {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            console.log([...deleteItem(user.cvs, 'id', id)])
            user.cvs = [...deleteItem(user.cvs, 'id', id)]
            setUser({ ...user })
        }
        catch (err) {
            console.log(err)
        }
    }

    const loadData = async () => {
        if (access_token) {
            try {
                setLoading(true)
                const res = await Apis.get(`${endpoints['current-user']}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json",
                    }
                })

               
                setUser(res.data)
                setAvatar(res.data.avatar)
            }
            catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
    }
    const JobViewHandler = () => {
        navigation.navigate("trang danh sách bài đăng", { 'owner': 1 })
    }

    const itemList = [
        {
            type: "infoBar",
            title: "họ và tên",
            keyList: ['last_name', 'first_name']
        },
        {
            type: "infoBar",
            title: "tài khoản",
            key: `username`
        },
        {
            type: "infoBar",
            title: "email",
            key: `email`
        },
        {
            type: 'list',
            listKey: 'phones',
            subTitleKey: 'số điện thoại',
            subValuekey: 'value'
        },
        user.role === 2 ?
            {
                type: "button",
                title: "xem bài đăng công việc",
                pressHandler: JobViewHandler
            } :
            {
                type: 'scrollList',
                listKey: 'cvs',
                itemPressHandler: cvPressHandler,
                bottomSheetRef: bottomSheetRef,
                listName: "danh sách CV",
                loadData: loadData,
                keyItems: { 'cvId': 'id' },
                title: "cv",
                contentKeys: ["name"],
                deleteItemHandler: deleteItemHandler,
            }
    ]

    const pickFile = async () => {
        setLoading(true)
        try {
            let result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
            if (result.canceled) { setLoading(false); return };
            const formData = new FormData()
            formData.append('name', name ? name : result.assets[0].name)
            formData.append("image", {
                uri: result.assets[0].uri,
                name: result.assets[0].name,
                type: result.assets[0].mimeType || "application/octet-stream",
            });
            const res = await Apis.post(`${endpoints['cvs-create']}`, formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "multipart/form-data"
                },
            })
            user.cvs = ([...user.cvs, { id: res.data.id, name: res.data.name }])
            setUser({ ...user })
        }
        catch (err) {
            console.log(err.response.data)
        }
        setLoading(false)
    };



    useEffect(() => {
        loadData()
    }, [access_token])

    if (!(access_token)) {
        return (
            <View style={[Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.flex1, Styles.bgColorF8FAFC]} >
                <Text style={styles.textNot}>vui lòng đăng nhập để xem</Text>
                <View style={styles.viewButton}>
                    <TouchButton title="đăng nhập" pressHandler={pressHandler} />
                </View>
            </View>
        )
    }
    if (loading) {
        return <LoadPage />
    }
    return (
        <View style={[Styles.alignItemsCenter, Styles.flex1, Styles.bgColorF8FAFC]} >
            <Avatar avatar={avatar} />
            <View style={styles.viewContainer}>
                {
                    itemList.map((item, index) => {
                        if (item.type === 'infoBar') {
                            if (item.keyList) {
                                return (
                                    <View key={index} style={Styles.marginBottom10}>
                                        <InfoBar title={item.title} content={`${item.keyList.map((subItem) => (user[subItem])).join(" ")}`} />
                                    </View>
                                )
                            }
                            else {
                                return (
                                    <View key={index} style={Styles.marginBottom10}>
                                        <InfoBar title={item.title} content={user[item.key]} />
                                    </View>
                                )
                            }
                        }
                        else if (item.type === 'list') {
                            return (
                                <View key={index}>
                                    {
                                        user[item.listKey].map((subItem, index) => {
                                            return (
                                                <View key={index + 10} style={Styles.marginBottom10}>
                                                    <InfoBar title={`${item.subTitleKey} ${index + 1}`} content={subItem[item.subValuekey]} />
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            )
                        }
                        else if (item.type === 'scrollList') {
                            return (
                                <View key={index} style={[Styles.h240, Styles.marginBottom10]}>
                                    <ScrollList
                                        List={user[item.listKey]}
                                        itemPressHandler={item.itemPressHandler}
                                        bottomSheetRef={item.bottomSheetRef}
                                        listName={item.listName}
                                        loadData={item.loadData}
                                        keyItems={item.keyItems}
                                        title={item.title}
                                        contentKeys={item.contentKeys}
                                        deleteItemHandler={item.deleteItemHandler}
                                    />
                                </View>
                            )
                        }
                        else if (item.type === 'button') {
                            return (
                                <View key={index} style={Styles.marginBottom10}>
                                    <TouchButton title={item.title} pressHandler={item.pressHandler} />
                                </View>
                            )
                        }
                    })

                }

                <TouchButton title="Đăng xuất" pressHandler={() => { dispatchUser("logout") }} />
            </View>
            {
                user.role == 1 &&
                <BottomSheet
                    ref={bottomSheetRef}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView >
                        <View style={[Styles.h240, Styles.bgColorF8FAFC, Styles.alignItemsCenter]}>
                            <View style={[Styles.w100per, Styles.p10]}>
                                <InputBar value={name} TextChangeHandler={setName} placeholder={"đặt tên (sẽ lấy tên của file nếu để trống)"} noMargin={true} />
                            </View>
                            <View style={[styles.nameView, Styles.p10]}>
                                <TouchButton backgroundColor={"red"} title={`tải CV từ máy`} pressHandler={pickFile} />
                            </View>
                            <View style={[styles.nameView, Styles.p10]}>
                                <TouchButton backgroundColor={"blue"} title={`tạo cv online`} pressHandler={createCVPressHandler} />
                            </View>
                        </View>
                    </BottomSheetView>
                </BottomSheet>
            }
        </View >
    )

}
export default PersonalPage

const styles = StyleSheet.create({
    textNot: {
        fontSize: 20,
        marginBottom: 20
    },
    viewButton: {
        width: 200
    },
    viewContainer: {
        width: '80%'
    },
    nameView: {
        width: 200
    }
})