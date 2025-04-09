import Styles from "../Styles"
import { View, Image } from "react-native"
const Avatar = (props) => {
    return (
        <View style={[Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.w100per, Styles.p10]}>
            <Image style={[Styles.borderRadius100, Styles.w150, Styles.h150]} source={{ uri: props.avatar ? props.avatar : "https://res.cloudinary.com/dx6brcofe/image/upload/v1736245841/woxspsofipalpoz8r4aj.jpg" }} />
        </View>
    )
}
export default Avatar