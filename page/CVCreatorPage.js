import InputBar from "../components/InputBar"
import { StyleSheet, View } from "react-native"
import { useState } from "react"
import InfoBar from "../components/InfoBar"

const CVCreatingPage = ({ navigation }) => {
    const [name, setName] = useState("")

    const CVViewPressHandler = () => {
        navigation.navigate("trang CV")
    }
    const ExperienceViewPressHandler = () => {
        navigation.navigate("trang thêm kinh nghiệm")
    }
    const EducationViewPressHandler = () => {
        navigation.navigate("trang học vấn")
    }

    return (
        <View style={styles.pageView}>
            <View style={styles.nameView}>
                <InfoBar backgroundColor={"lightblue"} content={`thêm tiêu chí làm việc`} pressHandler={() => { }} />
            </View>
            <View style={styles.nameView}>
                <InfoBar backgroundColor={"lightblue"} content={`thêm học vấn`} pressHandler={() => { EducationViewPressHandler() }} />
            </View>
            <View style={styles.nameView}>
                <InfoBar backgroundColor={"lightblue"} content={`thêm kinh nghiệm làm việc`} pressHandler={() => { ExperienceViewPressHandler() }} />
            </View>
            <View style={styles.nameView}>
                <InfoBar backgroundColor={"lightblue"} content={`thêm kỹ năng`} />
            </View>
            <View style={styles.nameView}>
                <InfoBar backgroundColor={"lightblue"} content={`xem và tạo CV`} pressHandler={CVViewPressHandler} />
            </View>
        </View>
    )
}
export default CVCreatingPage
const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        backgroundColor: "white"
    },
    nameView: {
        padding: 10
    }

})