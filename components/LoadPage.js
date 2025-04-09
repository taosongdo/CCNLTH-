import { View, ActivityIndicator, StyleSheet } from 'react-native'
import Styles from '../Styles';
const LoadPage = () => {

    return (
        <View style={[Styles.alignItemsCenter, Styles.justifyContentCenter, Styles.flex1]}>
            <ActivityIndicator size={80} color="blue" />
        </View>
    )
}
export default LoadPage
