import Styles from "../../Styles"
import {
    View, FlatList, RefreshControl, Pressable, Image, Text,
    StyleSheet
} from "react-native"
import { useContext, useEffect, useState } from "react"
import Apis, { endpoints } from "../../config/Apis"
import { UserContext } from "../../config/AppContext"
import { deleteItem } from "../../config/util"
const ChatList = ({ navigation, route }) => {

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
            console.log(res.data)
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
        <>
            <View style={[Styles.flex1, Styles.bgColorF8FAFC]}>
                <FlatList
                    data={chatList}
                    style={[Styles.bgColorF8FAFC, Styles.h240]}
                    contentContainerStyle={Styles.p10}
                    keyExtractor={(item) => item.apply_id}
                    renderItem={({ item }) => {
                        return (
                            <View style={[Styles.p10, item.apply_status == 3 ? styles.bgColorYellow : item.apply_status == 4 ? styles.bgColorGreen : styles.bgColorPink, Styles.borderRadius10]}>
                                <Pressable style={[Styles.flex1, Styles.flexDirectionRow, Styles.alignItemsCenter]} onPress={() => {
                                    navigation.navigate("trang chat", {
                                        apply_id: item.apply_id,
                                        another_user_avatar: item.another_user_avatar,
                                        another_user_last_name: item.another_user_last_name,
                                        another_user_first_name: item.another_user_first_name,
                                    })
                                }}>
                                    <Image source={{ uri: item.another_user_avatar }} style={[styles.h80, styles.w80, Styles.borderRadius100]} />
                                    <Text style={[Styles.p10, styles.fontSize30]}>{item.another_user_last_name} {item.another_user_first_name}</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={loadData} />
                    }
                />
            </View>
        </>
    )
}
export default ChatList

const styles = StyleSheet.create({
    w80: {
        width: 80
    },
    h80: {
        height: 80
    },
    fontSize30: {
        fontSize: 23
    },
    bgColorYellow: {
        backgroundColor: 'yellow'
    },
    bgColorPink: {
        backgroundColor: 'pink'
    },
    bgColorGreen: {
        backgroundColor: 'lightgreen'
    }
})