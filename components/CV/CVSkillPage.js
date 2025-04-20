import Styles from "../../Styles"
import { View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import ScrollList from "../ScrollList"
import { useContext, useEffect, useState} from "react"
import Apis, { endpoints } from "../../config/Apis"
import { UserContext } from "../../config/AppContext"
import InputBar from "../InputBar"
import TouchButton from "../TouchButton"
import InfoBar from "../InfoBar"

const CVSkillPage = () => {
    const { access_token } = useContext(UserContext)

    const [skillList, setSkillList] = useState()
    const [value, setValue] = useState()
    const [skillId, setSkillId] = useState()
    const loadData = async () => {
        try {
            const res = await Apis.get(endpoints['skills'], {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setSkillList(res.data)
        }
        catch (err) {
            console.log(err.response.data)
        }
    }
    const itemPressHandler = async (params) => {
        try {
            const res = await Apis.get(endpoints['skills-detail'](params.id), {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setValue(res.data.value)
            setSkillId(res.data.id)
        }
        catch (err) {
            console.log(err)
        }
    }
    const deleteItem = (arr, key, value) => {
        return arr.filter((item) => item[key] !== value);
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
                                await Apis.delete(endpoints['skills-detail'](id), {
                                    headers: {
                                        Authorization: `Bearer ${access_token}`
                                    }
                                })
                                setSkillList(deleteItem(skillList, 'id', id))
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
            console.log(err)
        }
    }
    const replaceItem = (arr, key, value, newItem) => {
        return arr.map(item => (item[key] === value ? newItem : item));
    }
    const createSkill = async () => {
        try {
            if (skillId) {
                const res = await Apis.patch(endpoints['skills-detail'](skillId), {
                    value: value
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                setSkillList(replaceItem(skillList, "id", res.data.id, res.data))
            }
            else {
                const res = await Apis.post(endpoints['skills-create'], {
                    value: value
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                setSkillList([res.data, ...skillList])
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const addNewItem = () => {
        setSkillId(null)
        setValue("")
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <View style={[Styles.flex1, Styles.bgColorF8FAFC]}>
            <View style={Styles.p10}>
                <ScrollList
                    List={skillList}
                    itemPressHandler={itemPressHandler}
                    listName={"kỹ năng"}
                    addNewItem={addNewItem}
                    loadData={loadData}
                    keyItems={{
                        'id': 'id',
                    }}
                    contentKeys={["id"]}
                    height={150}
                    deleteItemHandler={deleteItemHandler}
                />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={Styles.p10}>
                        <InfoBar title="id" content={skillId} />
                    </View>
                    <View style={[Styles.h150, Styles.p10]}>
                        <InputBar value={value} TextChangeHandler={setValue} placeholder={"điền mô tả"} noMargin={true} bgColor={"#DDE2E6"} multiline={true} />
                    </View>
                    <View style={Styles.p10}>
                        <TouchButton backgroundColor={"blue"} title={skillId ? "cập nhật hồ sơ kỹ năng" : "tạo hồ sơ kỹ năng"} pressHandler={createSkill} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View >
    )
}

export default CVSkillPage