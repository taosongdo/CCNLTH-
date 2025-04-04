import { FlatList, StyleSheet, View } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Tag from '../components/Tag'
import SearchBar from '../components/SearchBar'
import { Alert } from 'react-native'
import { userContext } from '../App'
import url from '../util/url'

const IndexPage = ({ navigation }) => {
    const [jobList, setJobList] = useState()
    const loadData = async ({ keyword, name, salaryMax, salaryMin, jobType }) => {
        try {
            const res = await axios.get(`${url.domainName}/job-postings/?${keyword ? `keyword=${keyword}` : ``}${name ? `&name=${name}` : ``}${salaryMax ? `&salary_max=${salaryMax}` : ``}${salaryMin ? `&salary_min=${salaryMin}` : ``}${jobType ? `&job_type=${jobType}` : ``}`)
            setJobList(res.data)
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



    const search = async ({ keyword, name, salaryMax, salaryMin, jobType }) => {
        loadData({ keyword, name, salaryMax, salaryMin, jobType })
    }
    const { token, role } = useContext(userContext)
   
    const pressHandler = () => {
        if (token) {
            Alert.alert("Thông báo !", `đã đăng nhập ! ${token}, ${role}`)
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

    return (
        <View>
            <SearchBar
                search={search}
            />
            <FlatList
                contentContainerStyle={styles.IndexPageFlatListContent}
                data={jobList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Tag item={item} pressHandler={pressHandler} />
                )}
                keyboardShouldPersistTaps="handled"
            />
        </View>

    )
}

const styles = StyleSheet.create({
    ViewIndexPage: {
        flex: 1
    },
    IndexPageFlatListContent: {
        alignItems: "center",
        backgroundColor: '#F5F7FA'
    }
})
export default IndexPage