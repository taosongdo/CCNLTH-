import { View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import ScrollList from "../ScrollList"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../config/AppContext"
import InputBar from "../InputBar"
import TouchButton from "../TouchButton"
import LoadPage from "../LoadPage"
import Styles from "../../Styles"
import Apis, { endpoints } from "../../config/Apis"


const EducationLevelPage = () => {
    const { access_token } = useContext(UserContext)
    const [eduactionLevelList, setEduactionLevelList] = useState()
    const [schoolName, setSchoolName] = useState()
    const [mature, setMature] = useState()
    const [description, setDescription] = useState()
    const [educationId, setEduactionId] = useState()
    const [loading, setLoading] = useState()
    const [certificate, setCerificate] = useState()

    useEffect(() => {
        async function loadDataEffect() {
            await loadData()
        }
        loadDataEffect()
    }, [])
    const loadData = async () => {
        setLoading(true)
        try {
            const res = await Apis.get(endpoints['education-levels'], {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setEduactionLevelList(res.data)
            addNewItem()
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    const itemPressHandler = async (params) => {
        try {
            const res = await Apis.get(endpoints['education-levels-detail'](params.id), {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setSchoolName(res.data.school_name)
            setMature(res.data.mature)
            setDescription(res.data.description)
            setEduactionId(res.data.id)
            setCerificate(res.data.certificate)
        }
        catch (err) {

        }
    }
    const addNewItem = () => {
        setSchoolName("")
        setMature("")
        setDescription("")
        setEduactionId(null)
        setCerificate("")
    }
    const replaceItem = (arr, key, value, newItem) => {
        return arr.map(item => (item[key] === value ? newItem : item));
    }
    const deleteItem = (arr, key, value) => {
        return arr.filter((item) => item[key] !== value);
    }
    const createNewEducation = async () => {
        setLoading(true)
        if (educationId) {
            try {
                const res = await Apis.patch(endpoints['education-levels-detail'](educationId), {
                    mature: mature,
                    school_name: schoolName,
                    description: description
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                setEduactionLevelList(replaceItem(eduactionLevelList, 'id', res.data.id, res.data))
            }
            catch (err) {
                console.log(err)
            }
        }
        else {

            try {

                const res = await Apis.post(endpoints['education-levels-create'], {
                    mature: mature,
                    school_name: schoolName,
                    description: description,
                    certificate: certificate
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                setEduactionLevelList([res.data, ...eduactionLevelList])
            }
            catch (err) {
                console.log(err.response.data)
            }
        }
        setLoading(false)
    }
    const deleteItemHandler = (id) => {
        try {
            Alert.alert(
                "thông báo",
                "xác nhận xóa",
                [
                    { text: "Hủy", style: "cancel" },
                    {
                        text: "OK", onPress: async () => {
                            try {
                                await Apis.delete(endpoints['education-levels-detail'](id), {
                                    headers: {
                                        Authorization: `Bearer ${access_token}`
                                    }
                                })
                                setEduactionLevelList(deleteItem(eduactionLevelList, 'id', id))
                            }
                            catch (err) {
                                console.log(err)
                            }
                        }
                    }
                ],
            )

        }
        catch (err) {
            console.log(err.response.data)
        }
    }
    if (loading) {
        return (
            <LoadPage />
        )
    }
    return (
        <View style={[Styles.flex1, Styles.bgColorF8FAFC]}>
            <View style={[Styles.p10, Styles.h240]}>
                <ScrollList
                    List={eduactionLevelList}
                    itemPressHandler={itemPressHandler}
                    listName={"danh sách học vấn"}
                    addNewItem={addNewItem}
                    loadData={loadData}
                    keyItems={{
                        'id': 'id',
                    }}
                    title="hv"
                    contentKeys={["school_name", "mature"]}
                    height={150}
                    deleteItemHandler={deleteItemHandler}
                />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={Styles.p10}>
                        <InputBar value={schoolName} TextChangeHandler={setSchoolName} placeholder={"điền tên trường học"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                    <View style={Styles.p10}>
                        <InputBar value={mature} TextChangeHandler={setMature} placeholder={"điền ngành học"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                    <View style={Styles.p10}>
                        <InputBar value={certificate} TextChangeHandler={setCerificate} placeholder={"điền chứng chỉ"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                    <View style={[Styles.h150, Styles.p10]}>
                        <InputBar value={description} TextChangeHandler={setDescription} placeholder={"điền mô tả"} noMargin={true} bgColor={"#DDE2E6"} multiline={true} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={Styles.p10}>
                <TouchButton backgroundColor={"blue"} title={educationId ? "cập nhật hồ sơ học vấn" : "tạo hồ sơ học vấn"} pressHandler={() => { createNewEducation() }} />
            </View>
        </View>
    )
}
export default EducationLevelPage

