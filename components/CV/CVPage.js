import { View, Alert, Keyboard, TouchableWithoutFeedback, ScrollView, StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { UserContext } from '../../config/AppContext';
import WebView from 'react-native-webview';
import InputBar from '../InputBar';
import htmlContent from '../../config/htmlContent'
import * as Print from 'expo-print';
import Styles from '../../Styles';
import Apis, { endpoints } from '../../config/Apis';
import TouchButton from '../TouchButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import InfoBar from '../InfoBar';




const CVPage = ({ navigation }) => {
    const route = useRoute();
    const params = route.params;

    const navigationHook = useNavigation()
    const { access_token } = useContext(UserContext)
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [cvInfomation, setCVInformation] = useState()
    const [loading, setLoading] = useState(true)
    const [pickerShow, setPickerShow] = useState(false)
    const [date, setDate] = useState(new Date())

    const [applyId, setApplyId] = useState()
    const [applyStatus, setApplyStatus] = useState()
    const [applyStatusLabel, setApplyStatusLabel] = useState()
    const [message, setMessage] = useState()
    const [interviewingDate, setInterviewingDate] = useState()

    const printHTML = async () => {
        try {
            const { uri, name } = await Print.printToFileAsync({
                html: htmlContent(cvInfomation)
            });
            const formData = new FormData()
            formData.append('image', {
                uri: uri,
                type: "application/pdf",
                name: "cv.pdf"
            })
            formData.append('name', "cv tự tạo")
            const res = await Apis.post(`${endpoints['cvs']}`, formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "multipart/form-data"
                },
            })
            Alert.alert("thông báo", "đã tạo thành công")
        }
        catch (err) {
            console.log(err.response.data)
        }
    };



    const nameChangeHandler = async () => {
        try {
            const res = await Apis.patch(endpoints['cvs-detail'](params.cvId), {
                name: name
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            Alert.alert("thông báo", "đã đổi tên thành công")
        }
        catch (err) {
            Alert.alert("thông báo", "đã đổi tên thất bại")
        }
    }

    const deleteApplyHandler = async () => {
        try {
            await Apis.delete(endpoints['applies-details'](params.applyId), {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            params.setCVId(null)
            params.setApplyId(null)
            params.setCVInformation(null)
            navigationHook.goBack()
        }
        catch (err) {
            console.log(err.response.data)
        }
    }
    const hideTimePiker = () => {
        setPickerShow(false)
    }
    const showTimePiker = () => {
        setPickerShow(true)
    }
    const updateApplyHandler = async (applyStatus, interviewingDate) => {
        try {

            const res = await Apis.post(endpoints['applies-more-infos-create'], {
                apply: applyId,
                apply_status: applyStatus,
                interviewing_date: interviewingDate,
                message: message
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }

            })
            setInterviewingDate(res.data.interviewing_date ? res.data.interviewing_date : "")
            setApplyStatus(res.data.apply_status)
            setApplyStatusLabel(res.data.apply_status_label)
        }
        catch (err) {
            console.log(err.response.data)
        }

    }
    const changeDateHandler = async () => {
        await updateApplyHandler(3, date)
    }
    const failHandler = async () => {
        await updateApplyHandler(5, null)
    }
    const acceptCVHandler = async () => {
        showTimePiker()
    }
    const loadData = async () => {
        try {
            if (params) {

                const res = await Apis.get(`${params.cvId ? endpoints['cvs-detail'](params.cvId) : endpoints['applies-details'](params.applyId)}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                if (params.cvId) {
                    setName(res.data.name)
                    setImage(res.data.image)
                }
                else {
                    setImage(res.data.cv.image)
                    setApplyId(res.data.id)
                    setApplyStatus(res.data.apply_status)
                    setApplyStatusLabel(res.data.apply_status_label)
                    setInterviewingDate(res.data.interviewing_date ? res.data.interviewing_date : "")
                    setMessage(res.data.message)
                }
            }
            else {
                const res = await Apis.get(`${endpoints['cv-information']}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                setCVInformation(res.data)
                setImage(true)
            }
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[Styles.flex1, Styles.bgColorBFDBFE]}>
                {(params && !params.applyId) &&
                    <View style={[Styles.flexDirectionRow, Styles.bgColorF8FAFC, Styles.p10]}>
                        <InputBar value={name} TextChangeHandler={setName} placeholder={"điền tên"} noMargin={true} />
                    </View>

                }
                <View style={[Styles.flex1, Styles.bgColorBFDBFE]}>
                    {!loading && <WebView style={[Styles.bgColorBFDBFE, Styles.w100per]} source={params ? { uri: `https://docs.google.com/gview?embedded=true&url=${image}` } : { html: htmlContent(cvInfomation) }} />}
                </View>
                <View style={[Styles.bgColorF8FAFC, Styles.p10]}>
                    {params ?
                        applyId ?
                            applyStatus !== 1 ?
                                <>
                                    <ScrollView style={[Styles.marginBottom10, styles.maxHeight150]}>
                                        <InfoBar content={message} multiline={true} />
                                    </ScrollView>
                                    <InfoBar content={`${applyStatusLabel} - ${interviewingDate}`} />
                                    {
                                        (!params.owner && applyStatus == 5) && <TouchButton title={"gỡ ứng tuyển"} pressHandler={deleteApplyHandler} />
                                    }
                                </> :
                                <>
                                    {
                                        params.owner &&
                                        <>
                                            <View style={[Styles.h150, Styles.marginBottom10]}>
                                                <InputBar value={message} TextChangeHandler={setMessage} placeholder={"điền thông điệp"} multiline={true} />
                                            </View>
                                            <DateTimePickerModal
                                                isVisible={pickerShow}
                                                mode="datetime"
                                                date={date}
                                                onConfirm={changeDateHandler}
                                                onCancel={hideTimePiker}
                                                is24Hour={true}
                                                minimumDate={new Date()}
                                            />
                                        </>
                                    }
                                    {params.owner ?
                                        <View style={[Styles.justifyContentBetween, Styles.flexDirectionRow]}>
                                            <View style={Styles.w48per}>
                                                <TouchButton title={"đánh rớt"} pressHandler={failHandler} />
                                            </View>
                                            <View style={Styles.w48per}>
                                                <TouchButton title={"tiến hành phỏng vấn"} pressHandler={acceptCVHandler} />
                                            </View>
                                        </View>
                                        :
                                        <TouchButton title={"gỡ ứng tuyển"} pressHandler={deleteApplyHandler} />
                                    }
                                </>
                            :
                            <TouchButton title={"đổi tên"} pressHandler={nameChangeHandler} />
                        :
                        <TouchButton title={"tạo cv"} pressHandler={printHTML} />
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default CVPage
const styles = StyleSheet.create({
    maxHeight150: {
        maxHeight: 150
    }
})

