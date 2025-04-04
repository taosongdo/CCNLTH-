import { useEffect, useState } from "react"
import { Pressable, TextInput, View, StyleSheet, Text } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import DropDownPicker from "react-native-dropdown-picker";
import url from "../util/url";
import axios from "axios";
const SearchBar = (props) => {
    const [optionCheck, setOptionCheck] = useState(false)


    const [keyword, setKeyword] = useState("")

    const [name, setName] = useState("")
    const [nameList, setNameList] = useState([])
    const [openNameList, setOpenNameList] = useState(false)
    const [nameKeyword, setNameKeyword] = useState("")
    const [nextUrl, setNextUrl] = useState("")

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
    const loadDataHandler = async (keyword) => {
        try {
            const res = await axios.get(`${url.domainName}/jobs/${keyword ? `?keyword=${keyword}` : ``}`)
            let list = res.data.results.map((job) => { return { label: job.name, value: job.id } })
            setNextUrl(res.data.next)
            setNameList(list)   
        }
        catch (err) {
            console.log(err)
        }
    }
    const loadMoreDataHandler = async () => {
        try {
            if (nextUrl) {
                const res = await axios.get(nextUrl)
                let list = res.data.results.map((job) => { return { label: job.name, value: job.id } })
                setNextUrl(res.data.next)
                setNameList([...nameList, ...list])
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        async function loadDataEffect() {
            if (optionCheck && !nameList.length) {
                await loadDataHandler(null)
            }
        }
        loadDataEffect()
    }, [optionCheck])
    useEffect(() => {
        if (optionCheck) {
            const timeoutId = setTimeout(async () => {
                await loadDataHandler(nameKeyword)
            }, 1000)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [nameKeyword])

    return (
        <View style={styles.ViewMain}>
            <View style={styles.searchBar}>
                <Pressable style={styles.dropDown} onPress={() => { openOptionsHandler() }}>
                    <FontAwesome5 name={optionCheck ? "arrow-circle-up" : "arrow-circle-down"} size={30} color="#222831"></FontAwesome5>
                </Pressable>
                <Pressable style={styles.searchButton} onPress={() => { props.search({ keyword: keyword, name: name, salaryMax: salaryMax, salaryMin: salaryMin, jobType: jobType }) }}>
                    <FontAwesome6 name="magnifying-glass" size={30} color="#222831"></FontAwesome6>
                </Pressable>
            </View>
            {
                optionCheck &&
                <View style={styles.optionsBar}>
                    <View style={styles.optionBar}>
                        <TextInput value={keyword} style={styles.optionInput} onChangeText={(event) => { changeKeywordHandler(event) }} placeholder="nhập từ khóa" />
                    </View>
                    <View style={styles.optionBar}>
                        <DropDownPicker
                            style={styles.jobTypeList}
                            open={openNameList}
                            value={name}
                            items={nameList}
                            setOpen={setOpenNameList}
                            setValue={setName}
                            placeholder="chọn chức công việc"
                            searchable={true}
                            onChangeSearchText={(text) => { setNameKeyword(text) }}
                            flatListProps={{
                                onEndReached: loadMoreDataHandler,
                                onEndReachedThreshold: 0.5,
                            }}
                        />
                    </View>
                    <View style={styles.optionBarSalary}>
                        <TextInput style={styles.optionInputSalary} value={salaryMin} onChangeText={(event) => { changeSalaryMinHandler(event) }} keyboardType="numeric" placeholder="nhập mức lương thấp nhất" />
                        <TextInput style={styles.optionInputSalary} value={salaryMax} onChangeText={(event) => { changeSalaryMaxHandler(event) }} keyboardType="numeric" placeholder="nhập mức lương cao nhất" />
                    </View>
                    <View style={styles.optionBar}>
                        <DropDownPicker
                            style={styles.jobTypeList}
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
    )
}
export default SearchBar

const styles = StyleSheet.create({
    ViewMain: {
        backgroundColor: "#DDE2E6"
    },
    searchBar: {
        height: 60,
        flexDirection: "row",
    },
    dropDown: {
        flex: 1,
        width: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    searchButton: {
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    TextOptionName: {
        fontSize: 20,
        textAlign: "center"
    },
    optionBar: {
        height: 60,
        padding: 5
    },
    optionInput: {
        width: '100%',
        height: '100%',
        backgroundColor: "#F5F7FA",
        borderRadius: 20,
        padding: 10,
        textAlign: "center"
    },
    optionBarSalary: {
        height: 60,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    optionInputSalary: {
        width: '48%',
        backgroundColor: "#F5F7FA",
        borderRadius: 20,
        textAlign: "center"
    },
    jobTypeList: {
        borderRadius: 20,
        borderWidth: 0,
        backgroundColor: "#F5F7FA",
        zIndex: 2
    }

})
