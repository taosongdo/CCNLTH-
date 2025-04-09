import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native'
import TouchButton from './TouchButton';
import { useState } from 'react';
import Styles from '../Styles';
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
            <View style={[styles.viewCVTitle, Styles.flexDirectionRow, Styles.justifyContentCenter, Styles.bgColorBFDBFE, Styles.h60]}>
                <Text style={[styles.textCVTitle, Styles.verticalAlignMiddle, Styles.textAlignCenter, Styles.flex1]}>
                    {props.listName}
                </Text>
                <View style={[{ margin: 7 }, Styles.w60]}>
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
                data={props.List}
                style={[styles.viewCVList, Styles.bgColorF8FAFC, Styles.h240]}
                contentContainerStyle={Styles.p10}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={Styles.flexDirectionRow}>
                        <View style={Styles.flex1}>
                            <TouchButton title={`${props.contentKeys.map((contentKey) => { return item[contentKey] }).join(" - ")}`} params={paramsParser(item, props.keyItems)} backgroundColor={"blue"} pressHandler={props.itemPressHandler} />
                        </View>
                        <View style={[styles.viewButton, Styles.w60, Styles.h60]}>
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
    },
    viewCVList: {
        borderColor: "#DDE2E6",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 5,
    },
    textCVTitle: {
        fontSize: 20,
    },
    viewButton: {
        marginLeft: 10,
    }

})