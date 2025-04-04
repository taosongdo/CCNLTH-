
import { useContext, useEffect, useState, useRef } from "react"
import { View, Text, FlatList, RefreshControl } from "react-native"
import { userContext } from "../App"
import { StyleSheet } from "react-native"
import TouchButton from "../components/TouchButton"
import Avatar from "../components/Avatar"
import InfoBar from "../components/InfoBar"
import axios from "axios"
import url from "../util/url"
import LoadPage from "../components/LoadPage"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import InputBar from "../components/InputBar"
import * as DocumentPicker from "expo-document-picker";
import ScrollList from "../components/ScrollList"

const PersonalPage = ({ navigation }) => {
    const { token } = useContext(userContext)
    const [avatar, setAvatar] = useState(null)
    const [email, setEmail] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [phoneList, setPhoneList] = useState([])
    const [username, setUsername] = useState(null)
    const [cvList, setCVList] = useState([])
    const [loading, setLoading] = useState(false)
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

    const pickFile = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
            if (result.canceled) { return };
            const formData = new FormData()
            formData.append('name', name ? name : result.assets[0].name)
            formData.append("image", {
                uri: result.assets[0].uri,
                name: result.assets[0].name,
                type: result.assets[0].mimeType || "application/octet-stream",
            });
            setLoading(true)
            const res = await axios.post(`${url.domainName}/cvs/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            })
            setLoading(false)
            console.log(cvList)
            setCVList([...cvList, { id: res.data.id, name: res.data.name }])
        }
        catch (err) {
            console.log(err.response.data)
        }
    };
    const loadData = async () => {
        if (token) {
            setLoading(true)
            const res = await axios.get(`${url.domainName}/users/current-user/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            setLoading(false)

            setAvatar(res.data.avatar)
            setEmail(res.data.email)
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setUsername(res.data.username)
            setPhoneList(res.data.phones)
            setCVList(res.data.cvs)
        }
    }

    useEffect(() => {
        async function loadDataEffect() {
            await loadData()
        }
        loadDataEffect()
    }, [token])

    if (token === null) {
        return (
            <View style={styles.personalPageView} >
                <Text style={styles.textNot}>vui lòng đăng nhập để xem</Text>
                <View style={styles.viewButton}>
                    <TouchButton backgroundColor={"red"} title="đăng nhập" pressHandler={pressHandler} />
                </View>
            </View>
        )
    }
    if (loading) {
        return <LoadPage />
    }
    return (
        <View style={styles.personalPageView} >
            <Avatar image={avatar} />
            <View style={styles.viewContainer}>
                <InfoBar title="họ và tên" content={`${lastName} ${firstName}`} />
                <InfoBar title="tài khoản" content={`${username}`} />
                <InfoBar title="email" content={email} />
                {
                    phoneList.map((phone, Index) => {
                        return (
                            <InfoBar key={phone.id} title={`số điện thoại ${Index + 1}`} content={phone.phone} />
                        )
                    })
                }
                <ScrollList
                    cvList={cvList}
                    itemPressHandler={cvPressHandler}
                    bottomSheetRef={bottomSheetRef}
                    listName={"danh sách CV"}
                    loadData={loadData}
                    keyItems={{ 'cvId': 'id' }}
                    title="cv"
                    contentKeys={["name"]}
                />

            </View>
            <BottomSheet
                ref={bottomSheetRef}
                enablePanDownToClose={true}
            >
                <BottomSheetView style={styles.contentContainer} >
                    <View style={styles.pageView}>
                        <View style={styles.nameView}>
                            <InputBar value={name} TextChangeHandler={setName} placeholder={"đặt tên (sẽ lấy tên của file nếu để trống)"} noMargin={true} />
                        </View>
                        <View style={styles.nameView}>
                            <InfoBar backgroundColor={"pink"} content={`tải CV từ máy`} pressHandler={() => { pickFile() }} />
                        </View>
                        <View style={styles.nameView}>
                            <InfoBar backgroundColor={"lightblue"} content={`tạo CV trực tiếp`} pressHandler={() => { createCVPressHandler() }} />
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )

}
export default PersonalPage

const styles = StyleSheet.create({
    personalPageView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F7FA"
    },
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
        padding: 10,
        backgroundColor: "#DDE2E6",
        height: 80
    },
    pageView: {
        height: 240,
        backgroundColor: "red"
    },
})