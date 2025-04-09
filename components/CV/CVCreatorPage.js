import { StyleSheet, View } from "react-native"
import { useState } from "react"
import InfoBar from "../../components/InfoBar"
import Styles from "../../Styles"
import TouchButton from "../TouchButton"

const CVCreatingPage = ({ navigation }) => {
    const [name, setName] = useState("")

    const cvViewPressHandler = () => {
        navigation.navigate("trang CV")
    }
    const experienceViewPressHandler = () => {
        navigation.navigate("trang thêm kinh nghiệm")
    }
    const educationViewPressHandler = () => {
        navigation.navigate("trang học vấn")
    }
    const criteriaViewPressHandler = () => {
        navigation.navigate("trang tiêu chí công việc")
    }
    const skillViewPressHandler = () => {
        navigation.navigate("trang kĩ năng")
    }

    return (
        <View style={[styles.pageView, Styles.flex1]}>
            <View style={Styles.p10}>
                <TouchButton title="thêm tiêu chí làm việc" backgroundColor={"blue"} pressHandler={criteriaViewPressHandler} />
            </View>
            <View style={Styles.p10}>
                <TouchButton title="thêm học vấn" backgroundColor={"blue"} pressHandler={educationViewPressHandler} />
            </View>
            <View style={Styles.p10}>
                <TouchButton title="thêm kinh nghiệm làm việc" backgroundColor={"blue"} pressHandler={experienceViewPressHandler} />
            </View>
            <View style={Styles.p10}>
                <TouchButton title="thêm kỹ năng" backgroundColor={"blue"} pressHandler={skillViewPressHandler} />
            </View>
            <View style={Styles.p10}>
                <TouchButton title="xem và tạo CV" backgroundColor={"blue"} pressHandler={cvViewPressHandler} />
            </View>
        </View>
    )
}
export default CVCreatingPage
const styles = StyleSheet.create({
    pageView: {
        backgroundColor: "white"
    },

})