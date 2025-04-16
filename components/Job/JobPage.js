import Styles from "../../Styles"
import { ScrollView, View, StyleSheet } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker'
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
import InputBar from "../InputBar";
import CityDistrict from "../CityDistrict"

const JobPage = ({ navigation }) => {
    const route = useRoute()
    const params = route.params
    const { token, role } = useContext(userContext)
    const [avatar, setAvatar] = useState()
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [requirements, setRequirements] = useState()
    const [description, setDescription] = useState()
    const [salary, setSalary] = useState()
    const [jobType, setJobType] = useState()
    const [jobTypeLabel, setJobTypeLabel] = useState()
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
    const [city, setCity] = useState()
    const [cityName, setCityName] = useState()
    const [district, setDistrict] = useState()
    const [districtName, setDistrictName] = useState()

    const loadData = async () => {
        try {
            if (params.id) {
                const res = await Apis.get(endpoints['job-postings-detail'](params.id), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAvatar(res.data.employer.avatar)
                setName(`${res.data.employer.last_name} ${res.data.employer.first_name}`)
                setAddress(`${res.data.address}`)

                setDistrict(res.data.district.id)
                setDistrictName(res.data.district.name)
                setCity(res.data.district.city.id)
                setCityName(res.data.district.city.name)

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
                    setCVInformation(`${res.data.apply.apply_status_label}: ${res.data.apply.interviewing_data ? res.data.apply.interviewing_data : 'nhà tuyển dụng chưa lên lịch'} - ${res.data.apply.cv_name}`)
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
                    Authorization: `Bearer ${token}`
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
                    Authorization: `Bearer ${token}`
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
                    Authorization: `Bearer ${token}`
                }
            })
            params.deleteTagJobPosting(params.id)
            navigation.goBack()
        }
        catch (err) {
            console.log(err.response.data)
        }
    }
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

                    <View style={[Styles.flexDirectionRow]}>
                        <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                            <FontAwesome5 name={"briefcase"} size={30} color="#222831" />
                        </View>
                        <View style={[Styles.flex1, (params.id && resultStatus != 2) ? {} : Styles.marginBottom10]}>
                            {
                                (params.id && resultStatus != 2) ?
                                    <InfoBar content={job} /> :
                                    <InputBar value={job} TextChangeHandler={setJob} placeholder={"điền công việc"} noMargin={true} />
                            }

                        </View>
                    </View>
                    <View style={[Styles.flexDirectionRow]}>
                        <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                            <FontAwesome5 name={"dollar-sign"} size={30} color="#222831" />
                        </View>
                        <View style={[Styles.flex1, (params.id && resultStatus != 2) ? {} : Styles.marginBottom10]}>
                            {
                                (params.id && resultStatus != 2) ?
                                    <InfoBar content={`${salary} VNĐ`} /> :
                                    <InputBar keyboardType={"numeric"} value={salary} TextChangeHandler={setSalary} placeholder={"điền lương"} />
                            }

                        </View>
                    </View>
                    {
                        (params.id && resultStatus != 2) &&
                        <View style={Styles.flexDirectionRow}>
                            <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                                <FontAwesome name={"user"} size={30} color="#222831" />
                            </View>
                            <View style={Styles.flex1}>
                                <InfoBar content={name} />
                            </View>
                        </View>
                    }
                    <View style={Styles.flexDirectionRow}>
                        <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                            <FontAwesome5 name={"clock"} size={30} color="#222831" />
                        </View>
                        <View style={[Styles.flex1]}>
                            {(params.id && resultStatus != 2) ?
                                <InfoBar content={jobTypeLabel} /> :
                                <>
                                    <TouchButton title="Full-Time" bgColor={jobType == 1 ? 'pink' : null} pressHandler={() => { setJobType(1) }} />
                                    <TouchButton title="Part-Time" bgColor={jobType == 2 ? 'pink' : null} pressHandler={() => { setJobType(2) }} />
                                    <TouchButton title="Contract" bgColor={jobType == 3 ? 'pink' : null} pressHandler={() => { setJobType(3) }} />
                                    <TouchButton title="Internship" bgColor={jobType == 4 ? 'pink' : null} pressHandler={() => { setJobType(4) }} />
                                    <TouchButton title="Freelance" bgColor={jobType == 5 ? 'pink' : null} pressHandler={() => { setJobType(5) }} />
                                    <TouchButton title="Temporary" bgColor={jobType == 6 ? 'pink' : null} pressHandler={() => { setJobType(6) }} />
                                    <TouchButton title="Remote-work" bgColor={jobType == 7 ? 'pink' : null} pressHandler={() => { setJobType(7) }} />
                                    <TouchButton title="Orders" bgColor={jobType == 8 ? 'pink' : null} pressHandler={() => { setJobType(8) }} />
                                </>
                            }
                        </View>
                    </View>
                    <View style={Styles.flexDirectionRow}>
                        <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                            <FontAwesome5 name={"users"} size={30} color="#222831" />
                        </View>
                        <View style={[Styles.flex1, (!params.id && resultStatus != 2) && Styles.marginBottom10]}>
                            {(params.id && resultStatus != 2) ?
                                <InfoBar content={`${quantity - passCounting} người`} /> :
                                <InputBar keyboardType={"numeric"} value={quantity} TextChangeHandler={setQuantity} placeholder={"điền số lượng"} noMargin={true} />
                            }
                        </View>
                    </View>
                    {(params.id && resultStatus != 2) &&
                        <View style={Styles.flexDirectionRow}>
                            <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                                <FontAwesome6 name={"location-dot"} size={30} color="#222831" />
                            </View>
                            <View style={Styles.flex1}>
                                <InfoBar content={`${address} ${districtName} ${cityName}`} />
                            </View>
                        </View>
                    }
                    <View style={[Styles.flexDirectionRow, (!(params.id) || resultStatus == 2) && Styles.marginBottom10]}>
                        <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                            <FontAwesome6 name={"wrench"} size={30} color="#222831" />
                        </View>
                        <View style={[Styles.flex1, (!(params.id) || resultStatus == 2) && Styles.h240]}>
                            {(params.id && resultStatus != 2) ?
                                <InfoBar multiline={true} content={requirements} /> :
                                <InputBar multiline={true} value={requirements} TextChangeHandler={setRequirements} placeholder={"điền yêu cầu"} noMargin={true} />
                            }
                        </View>
                    </View>
                    <View style={Styles.flexDirectionRow}>
                        <View style={[Styles.w60, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.marginBottom10]}>
                            <MaterialCommunityIcons name={"file-document-edit-outline"} size={30} color="#222831" />
                        </View>
                        <View style={[Styles.flex1, (!(params.id) || resultStatus == 2) && Styles.h240]}>
                            {(params.id && resultStatus != 2) ?
                                <InfoBar multiline={true} content={description} /> :
                                <InputBar multiline={true} value={description} TextChangeHandler={setDescription} placeholder={"điền mô tả"} noMargin={true} />
                            }

                        </View>
                    </View>
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
                                                <InfoBar multiline={true} backgroundColor={resultStatus == 1 ? 'lightgreen' : 'pink'} title={resultStatusLabel} content={resultMessage} />
                                                {resultStatus == 1 ?
                                                    <TouchButton title={"xem danh sách cv"} pressHandler={() => { navigation.navigate("trang chọn CV", { jobPosting: id, owner: 1 }) }} />
                                                    :
                                                    <TouchButton title={"cập nhật lại"} pressHandler={updateJobPosting} />
                                                }
                                            </>
                                            :
                                            <>
                                                <InfoBar content={'đang chờ xét duyệt'} />
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