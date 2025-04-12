import Styles from "../../Styles"
import { ScrollView, View } from "react-native"
import { useContext, useEffect, useState } from "react"
import Apis, { endpoints } from "../../config/Apis"
import { useRoute } from '@react-navigation/native';
import { userContext } from "../../App"
import Avatar from "../Avatar"
import InfoBar from "../InfoBar";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import TouchButton from "../TouchButton";

const JobPage = ({ navigation }) => {
    const route = useRoute()
    const params = route.params
    const { token, role } = useContext(userContext)
    const [avatar, setAvatar] = useState()
    const [name, setName] = useState()
    const [fullAddress, setFullAddress] = useState()
    const [requirements, setRequirements] = useState()
    const [description, setDescription] = useState()
    const [salary, setSalary] = useState()
    const [jobType, setJobType] = useState()
    const [job, setJob] = useState()
    const [quantity, setQuantity] = useState()
    const [replyRate, setReplyRate] = useState()
    const [seenCounting, setSeenCounting] = useState()
    const [passCounting, setPassCounting] = useState()
    const [id, setId] = useState()
    const [cvInformation, setCVInformation] = useState()
    const [cvId, setCVId] = useState()
    const [applyId, setApplyId] = useState()
    const [resultId, setResultId] = useState()
    const [resultMessage, setResultMessage] = useState()
    const [resultStatus, setResultStatus] = useState()
    const [resultStatusLabel, setResultStatusLabel] = useState()

    const loadData = async () => {
        try {
            const res = await Apis.get(endpoints['job-postings-detail'](params.id), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAvatar(res.data.employer.avatar)
            setName(`${res.data.employer.last_name} ${res.data.employer.first_name}`)
            setFullAddress(`${res.data.address} ${res.data.district.name} ${res.data.district.city.name}`)
            setRequirements("Văn bản có thể đề cập đến nhiều loại tài liệu khác nhau trong bối cảnh hành chính và pháp lý tại Việt Nam. Dưới đây là một số thông tin liên quan:")
            setDescription(res.data.description)
            setSalary(res.data.salary)
            setJobType(res.data.job_type_label)
            setJob(res.data.job)
            setSeenCounting(res.data.seen_counting)
            setReplyRate(res.data.reply_rate)
            setQuantity(res.data.quantity)
            setPassCounting(res.data.pass_counting)
            setId(res.data.id)
            if (res.data.apply) {
                setCVId(res.data.apply.cv_id)
                setApplyId(res.data.apply.id)
                setCVInformation(`${res.data.apply.apply_status_label}: ${res.data.apply.interviewing_data ? res.data.apply.interviewing_data : 'nhà tuyển dụng chưa lên lịch'} - ${res.data.apply.cv_name}`)
            }
            if (res.data.result) {
                setResultId(res.data.result.job_posting)
                setResultMessage(res.data.result.message)
                setResultStatus(res.data.result.status)
                setResultStatusLabel(res.data.result.status_label)
            }
        }
        catch (err) {
            console.log(err.responst.data?.message)
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <ScrollView style={[Styles.flex1, Styles.bgColorF8FAFC]}>
            <Avatar avatar={avatar} />
            <View style={{ paddingRight: 5 }}>

                <View style={[Styles.flexDirectionRow]}>
                    <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                        <FontAwesome5 name={"briefcase"} size={30} color="#222831" />
                    </View>
                    <View style={Styles.flex1}>
                        <InfoBar content={job} />
                    </View>
                </View>
                <View style={[Styles.flexDirectionRow]}>
                    <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                        <FontAwesome5 name={"dollar-sign"} size={30} color="#222831" />
                    </View>
                    <View style={Styles.flex1}>
                        <InfoBar content={`${salary} VNĐ`} />
                    </View>
                </View>
                <View style={Styles.flexDirectionRow}>
                    <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                        <FontAwesome name={"user"} size={30} color="#222831" />
                    </View>
                    <View style={Styles.flex1}>
                        <InfoBar content={name} />
                    </View>
                </View>
                <View style={Styles.flexDirectionRow}>
                    <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                        <FontAwesome5 name={"clock"} size={30} color="#222831" />
                    </View>
                    <View style={Styles.flex1}>
                        <InfoBar content={jobType} />
                    </View>
                </View>
                <View style={Styles.flexDirectionRow}>
                    <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                        <FontAwesome5 name={"users"} size={30} color="#222831" />
                    </View>
                    <View style={Styles.flex1}>
                        <InfoBar content={`${quantity - passCounting} người`} />
                    </View>
                </View>
                <View style={Styles.flexDirectionRow}>
                    <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                        <FontAwesome6 name={"location-dot"} size={30} color="#222831" />
                    </View>
                    <View style={Styles.flex1}>
                        <InfoBar content={fullAddress} />
                    </View>
                </View>
                <View style={[Styles.flexDirectionRow, Styles.marginBottom10]}>
                    <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                        <FontAwesome6 name={"wrench"} size={30} color="#222831" />
                    </View>
                    <View style={Styles.flex1}>
                        <InfoBar multiline={true} content={requirements} />
                    </View>
                </View>
                <View style={Styles.flexDirectionRow}>
                    <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                        <MaterialCommunityIcons name={"file-document-edit-outline"} size={30} color="#222831" />
                    </View>
                    <View style={[Styles.flex1]}>
                        <InfoBar multiline={true} content={description} />
                    </View>
                </View>
            </View>
            <View style={[Styles.flexDirectionRow, Styles.justifyContentBetween, Styles.p10]}>
                <View style={[Styles.w48per]}>
                    <InfoBar content={`số lượt xem ${seenCounting}`} />
                </View>
                <View style={[Styles.w48per]}>
                    <InfoBar content={`tỷ phản hồi ${replyRate}`} />
                </View>
            </View>

            {role == 1 ?
                <View style={Styles.p10}>
                    <TouchButton title={cvId ? cvInformation : "ứng tuyển"} pressHandler={cvId ? () => { navigation.navigate("trang CV", { setCVId: setCVId, setApplyId, setCVInformation: setCVInformation, applyId: applyId }) } : () => { navigation.navigate("trang chọn CV", { setCVId: setCVId, setCVInformation: setCVInformation, setApplyId: setApplyId, jobPosting: id }) }} />
                </View> :
                params.owner ?
                    resultId ?
                        <>
                            <View style={Styles.p10}>
                                <InfoBar multiline={true} backgroundColor={resultStatus == 1 ? 'lightgreen' : 'pink'} title={resultStatusLabel} content={resultMessage} />
                            </View>
                            <View style={Styles.p10}>
                                <TouchButton title={"xem danh sách cv"} pressHandler={() => { navigation.navigate("trang chọn CV", { jobPosting: id, owner: 1 }) }} />
                            </View>

                        </>
                        :
                        <View style={Styles.p10} >
                            <InfoBar content={'đang chờ xét duyệt'} />
                        </View>
                    :
                    <View style={Styles.p10}>
                        <InfoBar content={'đăng nhập với người ứng tuyển để ứng tuyển'} />
                    </View>
            }
        </ScrollView>
    )
}

export default JobPage