import { Text, View } from "react-native"
import Styles from "../Styles"
const InfoBar = (props) => {
    return (
        <View style={[props.backgroundColor ? { backgroundColor: props.backgroundColor } : Styles.bgColorBFDBFE, Styles.w100per, Styles.borderRadius10, Styles.p10]}>
            <Text multiline={props.multiline} style={[Styles.fontSize15, props.title ? {} : Styles.textAlignCenter, props.multiline ? { verticalAlign: 'top', textAlign: 'left' } : {}]}>
                {props.title}{props.title ? ":" : ""} {props.content}
            </Text>
        </View>
    )
}

export default InfoBar
