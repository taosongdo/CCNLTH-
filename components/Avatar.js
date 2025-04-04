import { View, Image, StyleSheet } from 'react-native'
const Avatar = (props) => {
    return (
        <View style={styles.avatarView}>
            <Image style={styles.avatarImage} source={{ uri: props.image ? props.image : "https://res.cloudinary.com/dx6brcofe/image/upload/v1736245841/woxspsofipalpoz8r4aj.jpg" }} />
        </View>
    )
}
export default Avatar

const styles = StyleSheet.create({
    avatarView: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 100
    }
})