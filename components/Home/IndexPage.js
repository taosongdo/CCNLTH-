import { FlatList, StyleSheet, View, Pressable, TextInput } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { useRoute } from '@react-navigation/native';
import Tag from '../Tag'
import { Alert } from 'react-native'
import { userContext } from '../../App'
import { FontAwesome5, FontAwesome6 } from 'react-native-vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import Styles from '../../Styles'
import Apis, { endpoints } from '../../config/Apis'


const IndexPage = ({ navigation }) => {
    const route = useRoute();
    const params = route.params;
    const [jobList, setJobList] = useState()
    const { token, role } = useContext(userContext)
    const [optionCheck, setOptionCheck] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [salaryMax, setSalaryMax] = useState(null)
    const [salaryMin, setSalaryMin] = useState(null)
    const [jobType, setJobType] = useState("")
    const [jobTypeList, setJobTypeList] = useState([
        { label: "Full-Time", value: 1 },
        { label: "Part-Time", value: 2 },
        { label: "Contract", value: 3 },
        { label: "Internship", value: 4 },
        { label: "Freelance", value: 5 },
        { label: "Temporary", value: 6 },
        { label: "Remote-work", value: 7 },
        { label: "Orders", value: 8 },
        { label: "BLANK", value: null },
    ])
    const [openJobTypeList, setOpenJobTypeList] = useState(false);
    const openOptionsHandler = () => {
        setOptionCheck(!optionCheck)
    }
    const changeKeywordHandler = (event) => {
        setKeyword(event)
    }
    const changeSalaryMinHandler = (event) => {
        setSalaryMin(event)
    }
    const changeSalaryMaxHandler = (event) => {
        setSalaryMax(event)
    }
    const search = async ({ keyword, name, salaryMax, salaryMin, jobType }) => {
        loadData({ keyword, name, salaryMax, salaryMin, jobType })
    }
    const pressHandler = (id) => {
        if (token) {
            navigation.navigate("trang công việc", { id: id })
        }
        else {
            Alert.alert(
                "Thông báo !",
                "Đăng nhập để xem chi tiết",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Đăng nhập", onPress: () => navigation.navigate("LoginPage") }
                ]
            );
        }
    }
    const loadData = async ({ keyword, salaryMax, salaryMin, jobType }) => {
        try {
            const owner = params?.owner
            if (owner) {
                const res = await Apis.get(`${endpoints['job-postings']}?${keyword ? `keyword=${keyword}` : ``}${salaryMax ? `&salary_max=${salaryMax}` : ``}${salaryMin ? `&salary_min=${salaryMin}` : ``}${jobType ? `&job_type=${jobType}` : ``}${owner ? `&owner=${1}` : ``}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setJobList(res.data.results)
            }
            else {
                const res = await Apis.get(`${endpoints['job-postings']}?${keyword ? `keyword=${keyword}` : ``}${salaryMax ? `&salary_max=${salaryMax}` : ``}${salaryMin ? `&salary_min=${salaryMin}` : ``}${jobType ? `&job_type=${jobType}` : ``}`)
                setJobList(res.data.results)
            }


        }
        catch (err) {
            console.log(err)
            if (err.response.status > 400) {
                Alert.alert("thông báo", `(${err.response.status}) ` + err.response.data.detail)
            }

        }
    }

    useEffect(() => {
        const loadDataEffect = async () => {
            await loadData({})
        }
        loadDataEffect()
    }, [])

    return (
        <View style={[Styles.bgColorF8FAFC, Styles.flex1]}>
            <View style={[styles.ViewMain, Styles.bgColorBFDBFE]}>
                <View style={[Styles.flexDirectionRow, Styles.h60]}>
                    <Pressable style={[styles.dropDown, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.flex1]} onPress={() => { openOptionsHandler() }}>
                        <FontAwesome5 name={optionCheck ? "arrow-circle-up" : "arrow-circle-down"} size={30} color="#222831"></FontAwesome5>
                    </Pressable>
                    <Pressable style={[styles.searchButton, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.w60, Styles.h60]} onPress={() => { search({ keyword: keyword, salaryMax: salaryMax, salaryMin: salaryMin, jobType: jobType }) }}>
                        <FontAwesome6 name="magnifying-glass" size={30} color="#222831"></FontAwesome6>
                    </Pressable>
                </View>
                {
                    optionCheck &&
                    <View style={styles.optionsBar}>
                        <View style={[Styles.h60, Styles.p10]}>
                            <TextInput value={keyword} style={[styles.optionInput, Styles.borderRadius20, Styles.textAlignCenter, Styles.bgColorF8FAFC, Styles.w100per, Styles.p10]} onChangeText={(event) => { changeKeywordHandler(event) }} placeholder="nhập từ khóa" />
                        </View>
                        <View style={[styles.optionBarSalary, Styles.flexDirectionRow, Styles.justifyContentBetween, Styles.h60, Styles.p10]}>
                            <TextInput style={[Styles.w48per, Styles.borderRadius20, Styles.textAlignCenter, Styles.bgColorF8FAFC]} value={salaryMin} onChangeText={(event) => { changeSalaryMinHandler(event) }} keyboardType="numeric" placeholder="nhập mức lương thấp nhất" />
                            <TextInput style={[Styles.w48per, Styles.borderRadius20, Styles.textAlignCenter, Styles.bgColorF8FAFC]} value={salaryMax} onChangeText={(event) => { changeSalaryMaxHandler(event) }} keyboardType="numeric" placeholder="nhập mức lương cao nhất" />
                        </View>
                        <View style={Styles.p10}>
                            <DropDownPicker
                                style={[styles.jobTypeList, Styles.borderRadius20, Styles.bgColorF8FAFC]}
                                open={openJobTypeList}
                                value={jobType}
                                items={jobTypeList}
                                setOpen={setOpenJobTypeList}
                                setValue={setJobType}
                                placeholder="Chọn loại hình làm việc"
                            />
                        </View>
                    </View>
                }
            </View>
            <FlatList
                contentContainerStyle={[Styles.alignItemsCenter]}
                data={jobList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Tag params={params} item={item} pressHandler={pressHandler} />
                )}
                keyboardShouldPersistTaps="handled"
            />
        </View>

    )
}

const styles = StyleSheet.create({
    dropDown: {
        width: 20,
    },
    optionInput: {
        height: '100%',
    },
    jobTypeList: {
        borderWidth: 0,
        zIndex: 2
    }
})
export default IndexPage