import { useEffect, useState } from "react"
import { Button, View, Text } from "react-native"
const Test = () => {
    const [a, setA] = useState(false)
    const [b, setB] = useState(true)
    const click = () => {
        setB(true)
        setTimeout(() => {
            console.log(b)
            setB(false)
        }, 2000)
    }
    useEffect(() => {
        console.log(b, 2)
        setA()
    }, [b])
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>{b && <Text>gg</Text>}<Button title={`${a}, ${b}`} onPress={click} /></View>
}
export default Test