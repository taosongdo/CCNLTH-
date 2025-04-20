import { FlatList, StyleSheet, View, Pressable, Text } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { useRoute } from '@react-navigation/native';
import Tag from '../Tag'
import { Alert } from 'react-native'
import { UserContext } from '../../config/AppContext';
import { FontAwesome5, FontAwesome6 } from 'react-native-vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import Styles from '../../Styles'
import Apis, { endpoints } from '../../config/Apis'
import TouchButton from '../TouchButton';
import { deleteItem } from '../../config/util';
import InputBar from '../InputBar';



const IndexPage = ({ navigation }) => {
    const route = useRoute();
    const params = route.params;
    const [jobList, setJobList] = useState()
    const [nextUrl, setNextUrl] = useState()
    const { access_token } = useContext(UserContext)
    const [optionCheck, setOptionCheck] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [salaryMax, setSalaryMax] = useState(null)
    const [salaryMin, setSalaryMin] = useState(null)
    const [jobType, setJobType] = useState("")
    const [sortByDate, setSortByDate] = useState()
    const [sortBySalary, setSortBySalary] = useState()
    const [sortByPopularity, setSortByPopularity] = useState()
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
    const search = async () => {
        const owner = params?.owner
        let url = `${endpoints['job-postings']}?`
        url += `${keyword ? `keyword=${keyword}` : ``}`
        url += `${salaryMax ? `&salary_max=${salaryMax}` : ``}`
        url += `${salaryMin ? `&salary_min=${salaryMin}` : ``}`
        url += `${jobType ? `&job_type=${jobType}` : ``}`
        url += `${owner ? `&owner=1` : ``}`
        url += `${sortByDate ? `&sort_by_date=1` : ``}`
        url += `${sortBySalary ? `&sort_by_salary=1` : ``}`
        url += `${sortByPopularity ? `&sort_by_popularity=1` : ``}`
        loadData(url)
    }
    const updateJobPostingList = (props) => {
        jobList.forEach((job) => {
            if (job.id === props.id) {
                job.quanity = props.quanity
                job.result = null
                job.salary = props.salary
                job.job = props.job
            }
        });
    }
    const pressHandler = (id, owner) => {
        if (access_token) {
            navigation.navigate("trang công việc", { id: id, owner: owner, updateJobPostingList: updateJobPostingList, deleteTagJobPosting: deleteTagJobPosting })
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
    const loadData = async (url) => {
        try {
            const owner = params?.owner
            const headers = owner ? { Authorization: `Bearer ${access_token}` } : {}
            const res = await Apis.get(url, {
                headers
            })
            setNextUrl(res.data.next)
            if (url === nextUrl) {
                setJobList([...jobList, ...res.data.results])
            }
            else {
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
    const addNew = (item) => {
        setJobList([item, ...jobList])
    }
    const deleteTagJobPosting = (id) => {
        setJobList(deleteItem(jobList, 'id', id))
    }
    const loadMoreDataHandler = () => {
        if (nextUrl) {
            loadData(nextUrl)
        }
    }
    const sortByDateHandler = () => {
        setSortByDate(!sortByDate)
    }
    const sortBySalaryHandler = () => {
        setSortBySalary(!sortBySalary)
    }
    const sortByPopularityHandler = () => {
        setSortByPopularity(!sortByPopularity)
    }

    useEffect(() => {
        search()
    }, [])

    return (
        <View style={[Styles.bgColorF8FAFC, Styles.flex1]}>
            <View style={[styles.ViewMain, Styles.bgColorF8FAFC]}>
                <View style={[Styles.flexDirectionRow, Styles.h60]}>
                    <Pressable style={[styles.dropDown, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.flex1]} onPress={() => { openOptionsHandler() }}>
                        <FontAwesome5 name={optionCheck ? "arrow-circle-up" : "arrow-circle-down"} size={30} color="#222831"></FontAwesome5>
                    </Pressable>
                    <Pressable style={[styles.searchButton, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.w60, Styles.h60]} onPress={search}>
                        <FontAwesome6 name="magnifying-glass" size={30} color="#222831"></FontAwesome6>
                    </Pressable>
                </View>


                {optionCheck &&
                    <>
                        <View style={styles.optionsBar}>
                            <View style={[Styles.h60, Styles.p10]}>
                                <InputBar value={keyword} TextChangeHandler={changeKeywordHandler} placeholder="nhập từ khóa" />
                            </View>
                            <View style={[styles.optionBarSalary, Styles.flexDirectionRow, Styles.justifyContentBetween, Styles.h60, Styles.p10]}>
                                <View style={[Styles.w48per]}>
                                    <InputBar value={salaryMin} TextChangeHandler={changeSalaryMinHandler} keyboardType={"mumeric"} placeholder="nhập mức lương thấp nhất" />
                                </View>
                                <View style={[Styles.w48per]}>
                                    <InputBar value={salaryMax} TextChangeHandler={changeSalaryMaxHandler} keyboardType={"mumeric"} placeholder="nhập mức lương cao nhất" />
                                </View>

                            </View>
                            <View style={[Styles.p10, Styles.alignItemsCenter]}>
                                <Text>lựa chọn sắp xếp</Text>
                            </View>
                            <View style={[styles.optionBarSalary, Styles.flexDirectionRow, Styles.justifyContentBetween, Styles.h60, Styles.p10]}>
                                <View style={[Styles.w30per]}>
                                    <TouchButton bgColor={sortByDate} title={"ngày giờ"} pressHandler={sortByDateHandler} />
                                </View>
                                <View style={[Styles.w30per]}>
                                    <TouchButton bgColor={sortBySalary} title="mức lương" pressHandler={sortBySalaryHandler} />
                                </View>
                                <View style={[Styles.w30per]}>
                                    <TouchButton bgColor={sortByPopularity} title="phổ biến" pressHandler={sortByPopularityHandler} />
                                </View>
                            </View>
                            <View style={Styles.p10}>
                                <DropDownPicker
                                    style={[styles.jobTypeList, Styles.borderRadius20, Styles.bgColorBFDBFE]}
                                    open={openJobTypeList}
                                    value={jobType}
                                    items={jobTypeList}
                                    setOpen={setOpenJobTypeList}
                                    setValue={setJobType}
                                    placeholder="Chọn loại hình làm việc"
                                />
                            </View>
                        </View>
                        {
                            params &&
                            <View style={[Styles.p10]}>
                                <TouchButton title="thêm bài đăng mới" pressHandler={() => { navigation.navigate("trang tạo bài đăng công việc", { addNew: addNew }) }} />
                            </View>
                        }
                    </>
                }
            </View>
            <FlatList
                contentContainerStyle={[Styles.alignItemsCenter]}
                data={jobList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Tag params={params} item={item} pressHandler={pressHandler} />
                )}
                onEndReached={loadMoreDataHandler}
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