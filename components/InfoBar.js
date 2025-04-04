import { StyleSheet, Text, Pressable } from "react-native"
const InfoBar = (props) => {

    return (
        <Pressable style={[styles.viewInfo, props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}]} onPress={() => { props.pressHandler?.(props.params) }}>
            <Text style={[styles.textInfo, props.title ? {} : { textAlign: "center" }]}>
                {props.title}{props.title ? ":" : ""} {props.content}
            </Text>
        </Pressable>
    )
}

export default InfoBar

const styles = StyleSheet.create({
    viewInfo: {
        height: 60,
        justifyContent: "center",
        paddingLeft: 15,
        backgroundColor: "#DDE2E6",
        width: '100%',
        borderRadius: 10,
        marginBottom: 10
    },
    textInfo: {
        fontSize: 20
    }
})