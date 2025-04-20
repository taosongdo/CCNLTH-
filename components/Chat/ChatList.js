import Styles from "../../Styles"
import {
    View, FlatList, RefreshControl, Pressable, Image, Text
} from "react-native"
import { useContext, useEffect, useState } from "react"
import Apis, { endpoints } from "../../config/Apis"
import { UserContext } from "../../config/AppContext"
const ChatList = () => {
    const { access_token } = useContext(UserContext)
    const [chatList, setChatList] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const loadData = async () => {
        try {
            const res = await Apis.get(endpoints['chat'], {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setChatList(res.data.chat_list)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <View style={[Styles.flex1, Styles.bgColorF8FAFC]}>
            <FlatList
                data={chatList}
                style={[Styles.bgColorF8FAFC, Styles.h240]}
                contentContainerStyle={Styles.p10}
                keyExtractor={(item) => item.apply_id}
                renderItem={({ item }) => {
                    return (
                        <View style={[Styles.h150, Styles.bgColorBFDBFE, Styles.borderRadius10]}>
                            <Pressable style={[Styles.flex1, Styles.flexDirectionRow, Styles.alignItemsCenter]}>
                                <Image source={{ uri: item.employer_avatar }} style={[Styles.w150, Styles.h150, Styles.borderRadius100]} />
                                <Text style={[Styles.p10, Styles.fontSize15]}>{item.employer_last_name} {item.employer_first_name}</Text>
                            </Pressable>
                        </View>
                    )
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadData} />
                }
            />
        </View>
    )
}
export default ChatList
