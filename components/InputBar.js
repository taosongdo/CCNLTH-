import { TextInput, StyleSheet } from "react-native"
const InputBar = ({ value, TextChangeHandler, placeholder, secureTextEntry, keyboardType, noMargin, bgColor, multiline }) => {
    return (
        <TextInput
            keyboardType={keyboardType}
            multiline={multiline}
            style={[styles.inputBar, noMargin ? { marginBottom: 0 } : {}, bgColor ? { backgroundColor: bgColor } : {}, multiline ? { verticalAlign: 'top', height: '100%' } : {}]}
            value={value}
            onChangeText={(text) => {
                TextChangeHandler?.(text)
            }}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder} />
    )
}

export default InputBar

const styles = StyleSheet.create({
    inputBar: {
        backgroundColor: '#F5F7FA',
        marginBottom: 10,
        borderRadius: 10,
        height: 40,
        width: '100%',
        paddingLeft: 10
    }
})