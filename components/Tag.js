import { View, Text, StyleSheet, Pressable } from "react-native"
import { useState } from "react"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

const Tag = (props) => {
    const [item, setItem] = useState(props.item)
    
    const cutText = (text) => {
        return text.length > 15 ? text.substring(0, 12) + "..." : text
    }
   
    return (
        <Pressable style={styles.TagView} onPress={() => { props.pressHandler() }}>
            <View style={styles.TagViewName}>
                <Text style={styles.TagName}>
                    {item.name}
                </Text>
            </View>
            <View style={styles.TagInfo}>
                <View style={styles.TagViewItem}><FontAwesome5 name="tools" size={20} color="#222831" /><Text style={styles.TagItem}>{cutText(item.requirements)}</Text></View>
                <View style={styles.TagViewItem}><FontAwesome5 name="dollar-sign" size={20} color="#222831" /><Text style={styles.TagItem}>{Intl.NumberFormat("en-US").format(item.salary)} VNĐ</Text></View>
                <View style={styles.TagViewItem}><FontAwesome5 name="users" size={20} color="#222831" /><Text style={styles.TagItem}>{item.quantity - item.pass_count} người</Text></View>
                <View style={styles.TagViewItem}><FontAwesome5 name="map-marker-alt" size={20} color="#222831" /><Text style={styles.TagItem}>{item.address} </Text></View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    TagView: {
        width: "100%",
        height: 150,
        backgroundColor: "#DDE2E6",
        borderRadius: 20,
        marginTop: 30
    },
    TagName: {
        fontSize: 30,
        fontWeight: 600,
        color: "#222831"
    },
    TagViewName: {
        height: "40%",
        alignItems: "center",
        justifyContent: "center",

    },
    TagInfo: {
        flex: 1,
        flexWrap: "wrap",

    },
    TagViewItem: {
        flexDirection: "row",
        alignItems: "center",
        width: "50%",
        height: "50%",
        justifyContent: "center"
    },
    TagItem: {
        color: "#222831",
        textAlign: "center",
        verticalAlign: "middle",
        fontSize: 15,
        marginLeft: 6
    }
})
export default Tag