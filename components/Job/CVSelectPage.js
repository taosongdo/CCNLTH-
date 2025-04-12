import { useContext, useEffect, useState } from "react"
import ScrollList from "../ScrollList"
import { useRoute } from '@react-navigation/native';
import Apis, { endpoints } from "../../config/Apis"
import { userContext } from "../../App"


const CVSelectPage = ({ navigation }) => {
    const route = useRoute();
    const paramsRoute = route.params
    const { token } = useContext(userContext)
    const [list, setList] = useState()
    const itemPressHandler = async (params) => {
        try {
            if (!(paramsRoute.owner)) {
                const res = await Apis.post(endpoints['applies-create'], {
                    cv: params.cvId,
                    job_posting: paramsRoute.jobPosting,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                paramsRoute.setCVId(res.data.cv)
                paramsRoute.setApplyId(res.data.id)
                paramsRoute.setCVInformation(`Sent: nhà tuyển dụng chưa lên lịch`)
                navigation.goBack()
            }
            else {

                navigation.navigate("trang CV", { applyId: params.applyId, owner: paramsRoute.owner })
            }
        }
        catch (err) {
            console.log(err.response.data)
        }

    }
    const loadData = async () => {
        try {
            const res = await Apis.get(`${paramsRoute.owner ? endpoints['applies'](paramsRoute.jobPosting) : endpoints['cvs']}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setList(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <ScrollList
            List={list}
            itemPressHandler={itemPressHandler}
            listName={"cv"}
            loadData={() => { }}
            keyItems={paramsRoute.owner ? {
                'applyId': 'id'
            } : { "cvId": 'id' }
            }
            contentKeys={paramsRoute.owner ? ["cv_id", "cv_name"] : ["id", 'name']}
        />
    )
}
export default CVSelectPage