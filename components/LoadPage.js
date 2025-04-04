import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useEffect } from 'react';
const LoadPage = () => {
   
    return (
        <View style={styles.loadingPage}>
            <ActivityIndicator size={80} color="blue" />
        </View>
    )
}
export default LoadPage
const styles = StyleSheet.create({
    loadingPage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})