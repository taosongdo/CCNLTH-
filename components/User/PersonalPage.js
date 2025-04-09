
import { useContext, useEffect, useState, useRef } from "react"
import { View, Text, Image } from "react-native"
import { userContext } from "../../App"
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

const PersonalPage = ({ navigation }) => {
    const { token, role } = useContext(userContext)
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
            const res = await Apis.post(`${endpoints['cvs']}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            })
            setLoading(false)
            setCVList([...cvList, { id: res.data.id, name: res.data.name }])
        }
        catch (err) {
            console.log(err.response.data)
        }
    };
    const loadData = async () => {
        if (token) {
            setLoading(true)
            const res = await Apis.get(`${endpoints['current-user']}`, {
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
    const JobViewHandler = () => {
        navigation.navigate("trang danh sách bài đăng", { 'owner': 1 })
    }
    useEffect(() => {
        loadData()
    }, [token])

    if (token === null) {
        return (
            <View style={[Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.flex1, Styles.bgColorF8FAFC]} >
                <Text style={[styles.textNot, Styles.color334155]}>vui lòng đăng nhập để xem</Text>
                <View style={styles.viewButton}>
                    <TouchButton  title="đăng nhập" pressHandler={pressHandler} />
                </View>
            </View>
        )
    }
    if (loading) {
        return <LoadPage />
    }
    return (
        <View style={[Styles.alignItemsCenter, Styles.flex1, Styles.bgColorF8FAFC]} >
            <Avatar avatar={avatar}/>
            <View style={styles.viewContainer}>
                <InfoBar title="họ và tên" content={`${lastName} ${firstName}`} />
                <InfoBar title="tài khoản" content={`${username}`} />
                <InfoBar title="email" content={email} />
                {
                    phoneList.map((phone, Index) => {
                        return (
                            <InfoBar key={phone.id} title={`số điện thoại ${Index + 1}`} content={phone.value} />
                        )
                    })
                }
                {role == 1 &&
                    <ScrollList
                        List={cvList}
                        itemPressHandler={cvPressHandler}
                        bottomSheetRef={bottomSheetRef}
                        listName={"danh sách CV"}
                        loadData={loadData}
                        keyItems={{ 'cvId': 'id' }}
                        title="cv"
                        contentKeys={["name"]}
                    />
                }
                {role == 2 &&
                    <TouchButton title="xem bài đăng công việc" backgroundColor="blue" pressHandler={JobViewHandler} />
                }

            </View>
            {role == 1 &&
                <BottomSheet
                    ref={bottomSheetRef}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView >
                        <View style={[Styles.h240, Styles.bgColorBFDBFE, Styles.alignItemsCenter]}>
                            <View style={[Styles.w100per, Styles.p10]}>
                                <InputBar value={name} TextChangeHandler={setName} placeholder={"đặt tên (sẽ lấy tên của file nếu để trống)"} noMargin={true} />
                            </View>
                            <View style={[styles.nameView, Styles.bgColorBFDBFE, Styles.p10]}>
                                <TouchButton backgroundColor={"red"} title={`tải CV từ máy`} pressHandler={pickFile} />
                            </View>
                            <View style={[styles.nameView, Styles.bgColorBFDBFE, Styles.p10]}>
                                <TouchButton backgroundColor={"blue"} title={`tạo cv online`} pressHandler={createCVPressHandler} />
                            </View>
                        </View>
                    </BottomSheetView>
                </BottomSheet>
            }
        </View>
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