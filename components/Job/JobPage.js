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

const JobPage = () => {
    const route = useRoute()
    const params = route.params
    const { token } = useContext(userContext)
    const [avatar, setAvatar] = useState()
    const [name, setName] = useState()
    const [fullAddress, setFullAddress] = useState()
    const [requirements, setRequirements] = useState()
    const [description, setDescription] = useState()
    const [salary, setSalary] = useState()
    const [jobType, setJobType] = useState()
    const [job, setJob] = useState()
    const [quantity, setQuantity] = useState()
    const [passCounting, setPassCounting] = useState()

    const loadData = async () => {
        try {
            const res = await Apis.get(endpoints['job-postings-detail'](params.id), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            setAvatar(res.data.employer.avatar)
            setName(`${res.data.employer.last_name} ${res.data.employer.first_name}`)
            setFullAddress(`${res.data.address} ${res.data.district.name} ${res.data.district.city.name}`)
            setRequirements("Văn bản có thể đề cập đến nhiều loại tài liệu khác nhau trong bối cảnh hành chính và pháp lý tại Việt Nam. Dưới đây là một số thông tin liên quan:")
            setDescription(res.data.description)
            setSalary(res.data.salary)
            setJobType(res.data.job_type_label)
            setJob(res.data.job)
            setPassCounting(res.data.pass_counting)
            setQuantity(res.data.quantity)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <ScrollView style={[Styles.flex1, Styles.bgColorBFDBFE]}>
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
            <View style={[Styles.flexDirectionRow, Styles.justifyContentBetween]}>
                <View style={[Styles.w48per]}>
                    <InfoBar content={`tỷ lệ đậu ${passCounting / quantity}`} />
                </View>
                <View style={[Styles.w48per]}>
                    <InfoBar content={`tỷ lệ đậu ${passCounting / quantity}`} />
                </View>
            </View>
        </ScrollView>
    )
}

export default JobPage