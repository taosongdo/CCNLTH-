import { View, StyleSheet, Alert } from 'react-native'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import url from '../util/url';
import { useRoute } from '@react-navigation/native';
import { userContext } from '../App';
import WebView from 'react-native-webview';
import InputBar from '../components/InputBar';
import InfoBar from '../components/InfoBar';
import htmlContent from '../util/htmlContent'
import * as Print from 'expo-print';



const CVPage = () => {
    const route = useRoute();
    const params = route.params;
    const { token } = useContext(userContext)
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [cvInfomation, setCVInformation] = useState()
    const [loading, setLoading] = useState(true)
    const printHTML = async () => {
        const { uri } = await Print.printToFileAsync({
            html: htmlContent(cvInfomation)
        });
        console.log(uri)
    };



    const nameChangeHandler = async () => {
        try {
            const res = await axios.patch(`${url.domainName}/cvs/${params.cvId}/`, {
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
                    const res = await axios.get(`${url.domainName}/cvs/${params.cvId}/`, {
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
                    const res = await axios.get(`${url.domainName}/users/cv-information/`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(res.data)
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
        <View style={styles.viewCVPage}>
            <View style={styles.viewName}>
                <InputBar value={name} TextChangeHandler={setName} placeholder={"điền tên"} noMargin={true} />
            </View>
            <View style={styles.cvView}>
                {!loading && <WebView Viewstyle={styles.imageCV} source={params ? { uri: `https://docs.google.com/gview?embedded=true&url=${image}` } : { html: htmlContent(cvInfomation) }} />}
            </View>
            {params ?
                <View style={styles.viewName}>
                    <InfoBar content={"đổi tên"} backgroundColor="lightblue" pressHandler={nameChangeHandler} />
                </View> :
                <View style={styles.viewName}>
                    <InfoBar content={"tạo cv"} backgroundColor="lightblue" pressHandler={printHTML} />
                </View>
            }
        </View>
    )
}
export default CVPage

const styles = StyleSheet.create({
    viewCVPage: {
        backgroundColor: "#DDE2E6",
        flex: 1,
    },
    cvView: {
        backgroundColor: "#DDE2E6",
        flex: 1
    },
    imageCV: {
        backgroundColor: "#DDE2E6",
        width: '100%',
    },
    viewName: {
        padding: 10,
        backgroundColor: "#DDE2E6",
        flexDirection: "row"
    }
})

