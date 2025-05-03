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
    const itemList = [
        {
            title: "thêm tiêu chí làm việc",
            pressHandler: criteriaViewPressHandler
        },
        {
            title: "thêm học vấn",
            pressHandler: educationViewPressHandler
        },
        {
            title: "thêm kinh nghiệm làm việc",
            pressHandler: experienceViewPressHandler
        },
        {
            title: "thêm kỹ năng",
            pressHandler: skillViewPressHandler
        },
        {
            title: "xem và tạo CV",
            pressHandler: cvViewPressHandler
        }
    ]

    return (
        <View style={[Styles, Styles.flex1]}>
            {
                itemList.map((item, index) => {
                    return (
                        <View key={index} style={Styles.p10}>
                            <TouchButton title={item.title} pressHandler={item.pressHandler} />
                        </View>
                    )
                })
            }
        </View >
    )
}
export default CVCreatingPage
const styles = StyleSheet.create({
    pageView: {
        backgroundColor: "white"
    },

})