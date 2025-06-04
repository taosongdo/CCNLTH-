import Styles from "../../Styles"
import { ScrollView, View, StyleSheet, Keyboard } from "react-native"
import { useContext, useEffect, useState } from "react"
import Apis, { endpoints } from "../../config/Apis"
import { useRoute } from '@react-navigation/native';
import { UserContext } from "../../config/AppContext"
import Avatar from "../Avatar"
import InfoBar from "../InfoBar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import TouchButton from "../TouchButton";
import InputBar from "../InputBar";
import CityDistrict from "../CityDistrict"
const JobPage = ({ navigation }) => {
    const route = useRoute()
    const params = route.params
    const { access_token, role } = useContext(UserContext)
    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [requirements, setRequirements] = useState("")
    const [description, setDescription] = useState("")
    const [salary, setSalary] = useState("")
    const [jobType, setJobType] = useState("")
    const [jobTypeLabel, setJobTypeLabel] = useState("")
    const [job, setJob] = useState("")
    const [quantity, setQuantity] = useState("")
    const [replyRate, setReplyRate] = useState("")
    const [seenCounting, setSeenCounting] = useState("")
    const [passCounting, setPassCounting] = useState("")
    const [id, setId] = useState("")
    const [cvInformation, setCVInformation] = useState("")
    const [cvId, setCVId] = useState("")
    const [applyId, setApplyId] = useState("")
    const [resultId, setResultId] = useState("")
    const [resultMessage, setResultMessage] = useState("")
    const [resultStatus, setResultStatus] = useState("")
    const [resultStatusLabel, setResultStatusLabel] = useState("")
    const [city, setCity] = useState("")
    const [cityName, setCityName] = useState("")
    const [district, setDistrict] = useState("")
    const [districtName, setDistrictName] = useState("")

    const loadData = async () => {
        try {
            if (params.id) {
                const res = await Apis.get(endpoints['job-postings-detail'](params.id), {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                setAvatar(res.data.employer.avatar)
                setName(`${res.data.employer.last_name} ${res.data.employer.first_name}`)


                setDistrict(res.data.district.id)
                setDistrictName(res.data.district.name)

                setCity(res.data.district.city.id)
                setCityName(res.data.district.city.name)

                setAddress(`${res.data.address}`)
                setRequirements(res.data.requirements)
                setDescription(res.data.description)
                setSalary(res.data.salary)
                setJobType(res.data.job_type)
                setJobTypeLabel(res.data.job_type_label)
                setJob(res.data.job)
                setSeenCounting(res.data.seen_counting)
                setReplyRate(res.data.reply_rate)
                setQuantity(res.data.quantity)
                setPassCounting(res.data.pass_counting)
                setId(res.data.id)

                if (res.data.apply) {
                    setCVId(res.data.apply.cv_id)
                    setApplyId(res.data.apply.id)
                    console.log(res.data.apply)
                    setCVInformation(`${res.data.apply.apply_status_label}: ${res.data.apply.interviewing_date ? res.data.apply.interviewing_date : 'nhà tuyển dụng chưa lên lịch'} - ${res.data.apply.cv_name}`)
                }
                if (res.data.result) {
                    setResultId(res.data.result.job_posting)
                    setResultMessage(res.data.result.message)
                    setResultStatus(res.data.result.status)
                    setResultStatusLabel(res.data.result.status_label)
                }
            }
        }
        catch (err) {
            console.log(err.responst.data?.message)
        }
    }
    const createJobPosting = async () => {
        try {
            const res = await Apis.post(endpoints['job-postings-create'], {
                job: job,
                district: district,
                description: description,
                requirements: requirements,
                salary: salary,
                job_type: jobType,
                quantity: quantity,
                address: address
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            params.addNew(res.data)
            navigation.goBack()
        }
        catch (err) {
            console.log(err.response.data)
        }
    }
    const updateJobPosting = async () => {
        try {
            const res = await Apis.patch(endpoints['job-postings-detail'](params.id), {
                job: job,
                district: district,
                description: description,
                requirements: requirements,
                salary: salary,
                job_type: jobType,
                quantity: quantity,
                address: address
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            props.updateJobPostingList({ quantity: quantity, salary: salary, job: name })
            navigation.goBack()
        }
        catch (err) {
            console.log(err.response.data)
        }
    }
    const deleteJobPosting = async () => {
        try {
            const res = await Apis.delete(endpoints['job-postings-detail'](params.id), {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            params.deleteTagJobPosting(params.id)
            navigation.goBack()
        }
        catch (err) {
            console.log(err.response.data)
        }
    }
    const itemList = [
        {
            type: "infoBar",
            icon: "briefcase",
            value: `${job}`,
            setValue: setJob,
            changeable: true,
            placeholder: "điền công việc",

        },
        {
            type: "infoBar",
            icon: "dollar-sign",
            value: `${salary}`,
            setValue: setSalary,
            changeable: true,
            placeholder: "điền lương",
            keyboardType: "numeric"
        },
        {
            type: "infoBar",
            icon: "user",
            value: `${name}`,

        },
        {
            type: "infoBar",
            icon: "clock",
            value: `${jobTypeLabel}`,
            changeable: true,
            list: [
                {
                    title: "Full-Time",
                    value: 1
                },
                {
                    title: "Part-Time",
                    value: 2
                },
                {
                    title: "Contract",
                    value: 3
                },
                {
                    title: "Internship",
                    value: 4
                },
                {
                    title: "Freelance",
                    value: 5
                },
                {
                    title: "Temporary",
                    value: 6
                },
                {
                    title: "Remote-word",
                    value: 7
                },
                {
                    title: "Orders",
                    value: 8
                }
            ]
        },
        {
            type: "infoBar",
            icon: "users",
            value: params.id ? `${quantity - passCounting} người` : quantity,
            setValue: setQuantity,
            changeable: true,
            keyboardType: 'numeric',
            placeholder: "số lượng người thuê"
        },
        {
            type: "infoBar",
            brand: "FontAwesome6",
            icon: "location-dot",
            value: `${address} ${districtName} ${cityName}`,
        },
        {
            type: "infoBar",
            icon: "wrench",
            value: `${requirements}`,
            multiline: true,
            changeable: true,
            setValue: setRequirements,
            placeholder: "thêm yêu cầu công việc"
        },
        {
            type: "infoBar",
            brand: "MaterialCommunityIcons",
            icon: "file-document-edit-outline",
            value: `${description}`,
            multiline: true,
            changeable: true,
            setValue: setDescription,
            placeholder: "thêm mô tả"
        }
    ]
    useEffect(() => {
        loadData()
    }, [])
    return (
        <View style={[Styles.flex1, Styles.bgColorF8FAFC]}>
            <Avatar avatar={avatar} />
            {(!(params.id) || resultStatus == 2) &&
                <View style={[{ paddingRight: 5 }, Styles.marginBottom10]}>
                    <View style={Styles.flexDirectionRow}>
                        <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                            <FontAwesome6 name={"location-dot"} size={30} color="#222831" />
                        </View>
                        <View style={[Styles.flex1]}>
                            <View style={Styles.marginBottom10}>
                                <InputBar value={address} TextChangeHandler={setAddress} placeholder={"điền địa chỉ"} />
                            </View>
                            <CityDistrict city={city} cityName={cityName} setCity={setCity} districtName={districtName} district={district} setDistrict={setDistrict} />
                        </View>
                    </View>
                </View>
            }
            <ScrollView style={[Styles.flex1, Styles.bgColorF8FAFC]}>

                <View style={{ paddingRight: 5 }}>
                    {
                        (params.id && resultStatus != 2) ?
                            itemList.map((item, index) => {
                                return (
                                    <View key={index} style={[Styles.flexDirectionRow]}>
                                        <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                                            {
                                                item.brand == null ?
                                                    <FontAwesome5 name={item.icon} size={30} color="#222831" /> :
                                                    (
                                                        item.brand == "FontAwesome6" ?
                                                            <FontAwesome6 name={item.icon} size={30} color="#222831" /> :
                                                            <MaterialCommunityIcons name={item.icon} size={30} color="#222831" />
                                                    )
                                            }

                                        </View>
                                        <View style={[Styles.flex1, Styles.marginBottom10]}>
                                            <InfoBar multiline={item.multiline} content={item.value} />
                                        </View>
                                    </View>
                                )
                            })
                            :
                            itemList.map((item, index) => {

                                if (item.changeable) {
                                    if (item.list) {
                                        return (
                                            <View key={index} style={[Styles.flexDirectionRow]}>
                                                <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                                                    <FontAwesome5 name={item.icon} size={30} color="#222831" />
                                                </View>
                                                <View style={[Styles.flex1, Styles.marginBottom10]}>
                                                    {
                                                        item.list.map((subItem, index) => {
                                                            return (
                                                                <View key={index} style={Styles.marginBottom10}>
                                                                    <TouchButton title={subItem.title} bgColor={jobType == subItem.value ? 'pink' : null} pressHandler={() => { setJobType(subItem.value) }} />
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        )

                                    }
                                    else {
                                        return (
                                            <View key={index} style={[Styles.flexDirectionRow]}>
                                                <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                                                    <FontAwesome5 name={item.icon} size={30} color="#222831" />
                                                </View>
                                                <View style={[Styles.flex1, Styles.marginBottom10]}>
                                                    <InputBar value={item.value} TextChangeHandler={item.setValue} placeholder={item.placeholder} keyboardType={item.keyboardType} />
                                                </View>
                                            </View>
                                        )
                                    }
                                }
                                else {
                                    return <View key={index} />
                                }
                            })
                    }
                </View>
                {(params.id && resultStatus != 2) &&
                    <View style={[Styles.flexDirectionRow, Styles.justifyContentBetween, Styles.p10]}>
                        <View style={[Styles.w48per]}>
                            <InfoBar content={`số lượt xem ${seenCounting}`} />
                        </View>
                        <View style={[Styles.w48per]}>
                            <InfoBar content={`tỷ phản hồi ${replyRate}`} />
                        </View>
                    </View>
                }
                <View style={Styles.p10}>
                    {role == 1 ?
                        <TouchButton title={cvId ? cvInformation : "ứng tuyển"} pressHandler={cvId ? () => { navigation.navigate("trang CV", { setCVId: setCVId, setApplyId, setCVInformation: setCVInformation, applyId: applyId }) } : () => { navigation.navigate("trang chọn CV", { setCVId: setCVId, setCVInformation: setCVInformation, setApplyId: setApplyId, jobPosting: id }) }} />
                        :
                        params.id ?
                            params.owner ?
                                <>
                                    {
                                        resultId ?
                                            <>
                                                <View style={Styles.marginBottom10}>
                                                    <InfoBar multiline={true} backgroundColor={resultStatus == 1 ? 'lightgreen' : 'pink'} title={resultStatusLabel} content={resultMessage} />
                                                </View>
                                                <View style={Styles.marginBottom10}>
                                                    {resultStatus == 1 ?
                                                        <TouchButton title={"xem danh sách cv"} pressHandler={() => { navigation.navigate("trang chọn CV", { jobPosting: id, owner: 1 }) }} />
                                                        :
                                                        <TouchButton title={"cập nhật lại"} pressHandler={updateJobPosting} />
                                                    }
                                                </View>
                                            </>
                                            :
                                            <>
                                                <View style={Styles.marginBottom10}>
                                                    <InfoBar content={'đang chờ xét duyệt'} />
                                                </View>
                                            </>
                                    }
                                    <TouchButton title="xóa bỏ" pressHandler={() => { deleteJobPosting() }} />
                                </>
                                :
                                <InfoBar content={'đăng nhập với người ứng tuyển để ứng tuyển'} />
                            :
                            <TouchButton title="thêm bài đăng" pressHandler={() => { createJobPosting() }} />
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default JobPage
const styles = StyleSheet.create({
    jobTypeList: {
        borderWidth: 0,
        zIndex: 1
    }
})