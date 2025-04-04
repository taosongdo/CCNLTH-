import { Pressable, Text, StyleSheet } from "react-native"

const TouchButton = (props) => {
    return (
        <Pressable style={[styles.buttonPress, { backgroundColor: props.backgroundColor }, props.height ? { height: props.height } : {}]} onPress={() => { props.pressHandler() }}>
            <Text style={styles.textTitle}>
                {props.title}
            </Text>
        </Pressable >
    )
}

export default TouchButton

const styles = StyleSheet.create({
    buttonPress: {
        marginBottom: 10,
        borderRadius: 10,
        height: 40,
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        fontSize: 17,
        color: "white",
        verticalAlign: "middle",
        textAlign: "center"
    }

})