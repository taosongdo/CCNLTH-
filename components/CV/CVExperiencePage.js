import { View, Keyboard, TouchableWithoutFeedback, Alert } from "react-native"
import ScrollList from "../ScrollList"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../App"
import InputBar from "../InputBar"
import TouchButton from "../TouchButton"
import LoadPage from "../LoadPage"
import Styles from "../../Styles"
import Apis, { endpoints } from "../../config/Apis"


const CVExperienceCreatorPage = () => {
    const { token } = useContext(userContext)
    const [experiencesList, setExperiencesList] = useState()
    const [companyName, setCompanyName] = useState()
    const [description, setDescription] = useState()
    const [experienceId, setExperienceId] = useState()
    const [job, setJob] = useState()
    const [loading, setLoading] = useState(false)
    const loadData = async () => {
        try {
            setLoading(true)
            const res = await Apis.get(`${endpoints['experiences']}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setExperiencesList(res.data)
            setCompanyName("")
            setDescription("")
            setExperienceId(null)
            setJob("")
        }
        catch (err) {
            console.log(err.response.data)
        }
        finally {
            setLoading(false)
        }
    }

    const itemPressHandler = async (params) => {
        try {
            const res = await Apis.get(endpoints['experiences-detail'](params.id), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCompanyName(res.data.company_name)
            setDescription(res.data.description)
            setExperienceId(res.data.id)
            setJob(res.data.job)
        }
        catch (err) {
            console.log(err)
        }

    }
    const addNewItem = () => {
        setCompanyName("")
        setDescription("")
        setExperienceId(null)
        setJob("")
    }
    const replaceItem = (arr, key, value, newItem) => {
        return arr.map(item => (item[key] === value ? newItem : item));
    }
    const deleteItem = (arr, key, value) => {
        return arr.filter((item) => item[key] !== value);
    }
    const deleteItemHandler = async (id) => {
        try {
            Alert.alert(
                "thông báo",
                "xác nhận xóa",
                [
                    { text: "Hủy", style: "cancel" },
                    {
                        text: "OK", onPress: async () => {
                            await Apis.delete(`${endpoints['experiences-detail'](id)}`, {
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
    const createNewExperience = async () => {
        setLoading(true)
        if (experienceId) {
            try {
                const res = await Apis.patch(endpoints['experiences-detail'](experienceId), {
                    job: job,
                    company_name: companyName,
                    description: description
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setExperiencesList(replaceItem(experiencesList, 'id', res.data.id, res.data))
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            try {
                const res = await Apis.post(endpoints['experiences-create'], {
                    job: job,
                    company_name: companyName,
                    description: description
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setExperiencesList([res.data, ...experiencesList])
            }
            catch (err) {
                console.log(err.response.data)
            }
        }
        setLoading(false)
    }
    useEffect(() => {
        async function loadDataEffect() {
            await loadData()
        }
        loadDataEffect()
    }, [])
    if (loading) {
        return (
            <LoadPage />
        )
    }
    return (
        <View style={Styles.flex1}>
            <View style={Styles.p10}>
                <ScrollList
                    List={experiencesList}
                    itemPressHandler={itemPressHandler}
                    listName={"kinh nghiệm"}
                    addNewItem={() => { addNewItem() }}
                    loadData={loadData}
                    keyItems={{
                        'id': 'id',
                    }}
                    title="kn"
                    contentKeys={["company_name", "job"]}
                    height={150}
                    deleteItemHandler={deleteItemHandler}
                />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={Styles.p10}>
                        <InputBar value={companyName} TextChangeHandler={setCompanyName} placeholder={"điền tên công ty"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                    <View style={[Styles.h150, Styles.p10]}>
                        <InputBar value={description} TextChangeHandler={setDescription} placeholder={"điền mô tả"} noMargin={true} bgColor={"#DDE2E6"} multiline={true} />
                    </View>
                    <View style={Styles.p10}>
                        <InputBar value={job} TextChangeHandler={setJob} placeholder={"điền công việc"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={[Styles.h60, Styles.p10]}>
                <TouchButton backgroundColor={"blue"} title={experienceId ? "cập nhật hồ sơ kinh nghiệm" : "tạo hồ sơ kinh nghiệm"} pressHandler={createNewExperience} />
            </View>
        </View>
    )
}

export default CVExperienceCreatorPage
