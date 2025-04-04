import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native'
import TouchButton from './TouchButton';
import { useState } from 'react';
import InfoBar from './InfoBar';
const ScrollList = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const paramsParser = (item, keyItems) => {
        let paramsObject = {}
        for (let key in keyItems) {
            paramsObject[key] = item[keyItems[key]]
        }
        return paramsObject
    }
    return (
        <>
            <View style={styles.viewCVTitle}>
                <Text style={styles.textCVTitle}>
                    {props.listName}
                </Text>
                <View style={{ width: 60, margin: 7 }}>
                    <TouchButton backgroundColor={"blue"} title="+" pressHandler={() => {
                        if (props.bottomSheetRef) {
                            props.bottomSheetRef.current?.expand()
                        }
                        else {
                            props.addNewItem()
                        }
                    }} />
                </View>
            </View>
            <FlatList
                data={props.cvList}
                style={[styles.viewCVList, props.height ? { height: props.height } : {}]}
                contentContainerStyle={styles.containCVList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.viewItem}>
                        <View style={styles.viewInfo}>
                            <InfoBar pressHandler={props.itemPressHandler} params={paramsParser(item, props.keyItems)} title={`${props.title} ${item.id}`} content={`${props.contentKeys.map((contentKey) => { return item[contentKey] }).join(" - ")} `} />
                        </View>
                        <View style={styles.viewButton}>
                            <TouchButton backgroundColor={"red"} title={"-"} height={'100%'} pressHandler={() => { props.deleteItemHandler(item.id) }} />
                        </View>
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={props.loadData} />
                }
            />
        </>
    )
}
export default ScrollList

const styles = StyleSheet.create({
    viewCVTitle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#DDE2E6",
        height: 60,

        justifyContent: "center",
        flexDirection: "row"
    },
    viewCVList: {
        height: 230,
        borderColor: "#DDE2E6",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 5,
    },
    textCVTitle: {
        flex: 1,
        fontSize: 20,
        textAlign: "center",
        verticalAlign: "middle"
    },
    containCVList: {
        padding: 10,
    },
    viewItem: {
        flexDirection: "row",
    },
    viewInfo: {
        flex: 1
    },
    viewButton: {
        width: 80,
        marginLeft: 10,
        height: 60
    }

})