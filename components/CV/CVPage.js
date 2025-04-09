import { View, Alert } from 'react-native'
import { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { userContext } from '../../App';
import WebView from 'react-native-webview';
import InputBar from '../InputBar';
import htmlContent from '../../config/htmlContent'
import * as Print from 'expo-print';
import Styles from '../../Styles';
import Apis, { endpoints } from '../../config/Apis';
import TouchButton from '../TouchButton';



const CVPage = () => {
    const route = useRoute();
    const params = route.params;
    const { token } = useContext(userContext)
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [cvInfomation, setCVInformation] = useState()
    const [loading, setLoading] = useState(true)
    const printHTML = async () => {
        try {
            const { uri, name } = await Print.printToFileAsync({
                html: htmlContent(cvInfomation)
            });
            console.log(uri)
            const formData = new FormData()
            formData.append('image', {
                uri: uri,
                type: "application/pdf",
                name: "cv.pdf"
            })
            formData.append('name', "cv tự tạo")
            const res = await Apis.post(`${endpoints['cvs']}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
            const res = await Apis.patch(`${endpoints['cvs-detail'](params.cvId)}`, {
                name: name
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            Alert.alert("thông báo", "đã đổi tên thành công")
        }
        catch (err) {
            Alert.alert("thông báo", "đã đổi tên thất bại")
        }
    }


    useEffect(() => {
        async function loadData() {
            if (params) {
                try {
                    const res = await Apis.get(`${endpoints['cvs-detail'](params.cvId)}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setName(res.data.name)
                    setImage(res.data.image)
                }
                catch (err) {
                    console.log(err)
                }
            }
            else {
                try {
                    const res = await Apis.get(`${endpoints['cv-information']}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setCVInformation(res.data)
                    setImage(true)
                }
                catch (err) {
                    console.log(err)
                }
            }
            setLoading(false)
        }
        loadData()
    }, [])

    return (
        <View style={[Styles.flex1, Styles.bgColorBFDBFE]}>
            <View style={[Styles.flexDirectionRow, Styles.bgColorBFDBFE, Styles.p10]}>
                <InputBar value={name} TextChangeHandler={setName} placeholder={"điền tên"} noMargin={true} />
            </View>
            <View style={[Styles.flex1, Styles.bgColorBFDBFE]}>
                {!loading && <WebView Viewstyle={[Styles.bgColorBFDBFE, Styles.w100per]} source={params ? { uri: `https://docs.google.com/gview?embedded=true&url=${image}` } : { html: htmlContent(cvInfomation) }} />}
            </View>
            {params ?
                <View style={[Styles.flexDirectionRow, Styles.bgColorBFDBFE, Styles.p10]}>
                    <TouchButton title={"đổi tên"} backgroundColor="lightblue" pressHandler={nameChangeHandler} />
                </View> :
                <View style={[Styles.flexDirectionRow, Styles.bgColorBFDBFE, Styles.p10]}>
                    <TouchButton title={"tạo cv"} backgroundColor="blue" pressHandler={printHTML} />
                </View>
            }
        </View>
    )
}
export default CVPage

