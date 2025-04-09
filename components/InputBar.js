import { TextInput, StyleSheet } from "react-native"
import Styles from "../Styles"
const InputBar = ({ value, TextChangeHandler, placeholder, secureTextEntry, keyboardType, bgColor, multiline }) => {
    return (
        <TextInput
            keyboardType={keyboardType}
            multiline={multiline}
            style={[Styles.borderRadius10, Styles.bgColorF8FAFC, Styles.w100per, Styles.h45, Styles.p10, bgColor ? { backgroundColor: bgColor } : {}, multiline ? { verticalAlign: 'top', height: '100%' } : {}]}
            value={value}
            onChangeText={(text) => {
                TextChangeHandler?.(text)
            }}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder} />
    )
}

export default InputBar