import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native"
import ScrollList from "../components/ScrollList"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import url from "../util/url"
import { userContext } from "../App"
import InputBar from "../components/InputBar"
import TouchButton from "../components/TouchButton"
import LoadPage from "../components/LoadPage"


const EducationLevelPage = () => {
    const { token } = useContext(userContext)
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
            const res = await axios.get(`${url.domainName}/education-levels/`, {
                headers: {
                    Authorization: `Bearer ${token}`
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
    const itemPressHandler = (params) => {
        setSchoolName(params.school_name)
        setMature(params.mature)
        setDescription(params.description)
        setEduactionId(params.id)
        setCerificate(params.certificate)
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
                const res = await axios.patch(`${url.domainName}/education-levels/${educationId}/`, {
                    mature: mature,
                    school_name: schoolName,
                    description: description
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
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
                const res = await axios.post(`${url.domainName}/education-levels/`, {
                    mature: mature,
                    school_name: schoolName,
                    description: description,
                    certificate: certificate
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
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
    const deleteItemHandler = () => {
        try {
            Alert.alert(
                "thông báo",
                "xác nhận xóa",
                [
                    { text: "Hủy", style: "cancel" },
                    {
                        text: "OK", onPress: async () => {
                            await axios.delete(`${url.domainName}/experiences/${id}/`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                            setExperiencesList(deleteItem(experiencesList, 'id', id))
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
        <View style={styles.viewPage}>
            <View style={styles.viewList}>
                <ScrollList
                    cvList={eduactionLevelList}
                    itemPressHandler={itemPressHandler}
                    listName={"danh sách học vấn"}
                    addNewItem={addNewItem}
                    loadData={loadData}
                    keyItems={{
                        'id': 'id',
                        'description': 'description',
                        'school_name': 'school_name',
                        'mature': 'mature',
                        'certificate': 'certificate'
                    }}
                    title="hv"
                    contentKeys={["school_name", "mature"]}
                    height={150}
                    deleteItemHandler={() => { }}
                />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={styles.viewInput}>
                        <InputBar value={schoolName} TextChangeHandler={setSchoolName} placeholder={"điền tên trường học"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                    <View style={styles.viewInput}>
                        <InputBar value={mature} TextChangeHandler={setMature} placeholder={"điền ngành học"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                    <View style={styles.viewInput}>
                        <InputBar value={certificate} TextChangeHandler={setCerificate} placeholder={"điền chứng chỉ"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                    <View style={styles.viewDescription}>
                        <InputBar value={description} TextChangeHandler={setDescription} placeholder={"điền mô tả"} noMargin={true} bgColor={"#DDE2E6"} multiline={true} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.viewInput}>
                <TouchButton backgroundColor={"blue"} title={educationId ? "cập nhật hồ sơ học vấn" : "tạo hồ sơ học vấn"} pressHandler={() => { createNewEducation() }} />
            </View>
        </View>
    )
}
export default EducationLevelPage

const styles = StyleSheet.create({
    viewPage: {
        flex: 1,
        backgroundColor: '#F5F7FA'
    },
    viewList: {
        padding: 10
    },
    viewInput: {
        padding: 10
    },
    viewDescription: {
        padding: 10,
        height: 150
    }
})

