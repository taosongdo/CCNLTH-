import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Alert } from "react-native"
import ScrollList from "../components/ScrollList"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import url from "../util/url"
import { userContext } from "../App"
import InputBar from "../components/InputBar"
import TouchButton from "../components/TouchButton"
import LoadPage from "../components/LoadPage"


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
            const res = await axios.get(`${url.domainName}/experiences/`, {
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

    const itemPressHandler = (params) => {
        setCompanyName(params.company_name)
        setDescription(params.description)
        setExperienceId(params.id)
        setJob(params.job)
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
    const createNewExperience = async () => {
        setLoading(true)
        if (experienceId) {
            try {
                const res = await axios.patch(`${url.domainName}/experiences/${experienceId}/`, {
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
                const res = await axios.post(`${url.domainName}/experiences/`, {
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
        <View style={styles.viewPage}>
            <View style={styles.listStyle}>
                <ScrollList
                    cvList={experiencesList}
                    itemPressHandler={itemPressHandler}
                    listName={"kinh nghiệm"}
                    addNewItem={() => { addNewItem() }}
                    loadData={loadData}
                    keyItems={{
                        'id': 'id',
                        'description': 'description',
                        'company_name': 'company_name',
                        'job': 'job',
                    }}
                    title="kn"
                    contentKeys={["company_name", "job"]}
                    height={150}
                    deleteItemHandler={deleteItemHandler}
                />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={styles.viewInput}>
                        <InputBar value={companyName} TextChangeHandler={setCompanyName} placeholder={"điền tên công ty"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                    <View style={styles.viewDescription}>
                        <InputBar value={description} TextChangeHandler={setDescription} placeholder={"điền mô tả"} noMargin={true} bgColor={"#DDE2E6"} multiline={true} />
                    </View>
                    <View style={styles.viewInput}>
                        <InputBar value={job} TextChangeHandler={setJob} placeholder={"điền công việc"} noMargin={true} bgColor={"#DDE2E6"} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.viewInput}>
                <TouchButton backgroundColor={"blue"} title={experienceId ? "cập nhật hồ sơ kinh nghiệm" : "tạo hồ sơ kinh nghiệm"} pressHandler={createNewExperience} />
            </View>
        </View>
    )
}

export default CVExperienceCreatorPage

const styles = StyleSheet.create({
    viewPage: {
        flex: 1,
        backgroundColor: ""
    },
    listStyle: {
        padding: 10
    },
    viewInput: {
        padding: 10,
        height: 60,
    },
    viewDescription: {
        padding: 10,
        height: 150,
    }

})
