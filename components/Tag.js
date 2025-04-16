import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Styles from "../Styles"

const Tag = (props) => {
    const item = props.item
    const params = props.params
    const setBackgroundColor = () => {
        return params ? (item.result ? (item.result.status == 1 ? { backgroundColor: 'lightgreen' } : { backgroundColor: "pink" }) : { backgroundColor: "yellow" }) : Styles.bgColorBFDBFE
    }
    const reduceText = (text) => {
        return text.length < 12 ? text : (text.substring(0, 12) + "...")
    }


    return (
        <Pressable style={[styles.TagView, setBackgroundColor(), Styles.borderRadius20, Styles.h150]} onPress={() => { props.pressHandler(item.id, params ? 1 : null) }}>
            <View style={[styles.TagViewName, Styles.alignItemsCenter, Styles.justifyContentCenter]}>
                <Text style={styles.TagName}>
                    {item.job}
                </Text>
            </View>
            <View style={[styles.TagInfo, Styles.flex1]}>
                <View style={[styles.TagViewItem, Styles.alignItemsCenter, Styles.flexDirectionRow, Styles.justifyContentCenter]}><Image style={[styles.avatar, Styles.h45, Styles.borderRadius100]} source={{ uri: item.employer.avatar }} /><Text style={[styles.TagItem, Styles.fontSize15, Styles.verticalAlignMiddle, Styles.textAlignCenter]}>{reduceText(`${item.employer.last_name} ${item.employer.first_name}`)}</Text></View>
                <View style={[styles.TagViewItem, Styles.alignItemsCenter, Styles.flexDirectionRow, Styles.justifyContentCenter]}><FontAwesome5 name="dollar-sign" size={20} color="#222831" /><Text style={[styles.TagItem, Styles.fontSize15, Styles.verticalAlignMiddle, Styles.textAlignCenter]}>{reduceText(`${Intl.NumberFormat("en-US").format(item.salary)}`)} VNĐ</Text></View>
                <View style={[styles.TagViewItem, Styles.alignItemsCenter, Styles.flexDirectionRow, Styles.justifyContentCenter]}><FontAwesome5 name="users" size={20} color="#222831" /><Text style={[styles.TagItem, Styles.fontSize15, Styles.verticalAlignMiddle, Styles.textAlignCenter]}>{reduceText(`${item.quantity}`)} người</Text></View>
                <View style={[styles.TagViewItem, Styles.alignItemsCenter, Styles.flexDirectionRow, Styles.justifyContentCenter]}><FontAwesome5 name="map-marker-alt" size={20} color="#222831" /><Text style={[styles.TagItem, Styles.fontSize15, Styles.verticalAlignMiddle, Styles.textAlignCenter]}>{reduceText(`${item.district.name} ${item.district.city.name}`)}</Text></View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    avatar: {
        width: 45
    },
    TagView: {
        marginTop: 10,
        width: 350
    },
    TagName: {
        fontSize: 30,
        fontWeight: 600,
        color: "#222831"
    },
    TagViewName: {
        height: "40%",
    },
    TagInfo: {
        flexWrap: "wrap"
    },
    TagViewItem: {
        width: "50%",
        height: "50%",
    },
    TagItem: {
        color: "#222831",
        marginLeft: 6
    }
})
export default Tag