import { Pressable, Text, } from "react-native"
import Styles from "../Styles"

const TouchButton = (props) => {
    return (
        <Pressable style={[Styles.marginBottom10, Styles.borderRadius10, Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.w100per, Styles.h45, Styles.bgColorDBEAFE]}
            onPress={() => {
                if (props.params) {
                    props.pressHandler(props.params)
                }
                else {
                    props.pressHandler()
                }
            }}>
            <Text style={[Styles.color334155, Styles.fontSize15, Styles.verticalAlignMiddle, Styles.textAlignCenter]}>
                {props.title}
            </Text>
        </Pressable >
    )
}

export default TouchButton

