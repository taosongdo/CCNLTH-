import { TextInput } from "react-native"
import Styles from "../Styles"
const InputBar = ({ value, TextChangeHandler, placeholder, secureTextEntry, keyboardType, multiline }) => {
    return (
        <TextInput
            keyboardType={keyboardType}
            multiline={multiline}
            style={[Styles.borderRadius10, Styles.bgColorBFDBFE, Styles.w100per, Styles.h45, Styles.p10, multiline ? { verticalAlign: 'top', height: '100%' } : {}]}
            value={value}
            onChangeText={(text) => {
                TextChangeHandler?.(text)
            }}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder} />
    )
}

export default InputBar