import { useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import Styles from "../Styles"
import DropDownPicker from "react-native-dropdown-picker"
import Apis, { endpoints } from "../config/Apis"

const CityDistrict = (props) => {
    const [openCityList, setOpenCityList] = useState(false)

    const [cityList, setCityList] = useState([])
    const [nextUrlCity, setNextUrlCity] = useState()
    const [cityKeyword, setCityKeyword] = useState()

    const [openDistrictList, setOpenDistrictList] = useState(false)

    const [districtList, setDistrictList] = useState([])
    const [nextUrlDistrict, setNextUrlDistrict] = useState()
    const [districtKeyword, setDistrictKeyword] = useState()
    const loadMoreDataCityHandler = () => {
        if (nextUrlCity) {
            loadDataCity(nextUrlCity, null)
        }
    }
    const loadMoreDataDistrictHandler = () => {
        if (nextUrlDistrict) {
            loadDataDistrict(nextUrlDistrict, null)
        }
    }
    const loadDataCity = async (endpoint, text) => {
        try {
            const res = await Apis.get(`${endpoint}${text ? `?keyword=${text}` : ''}`)
            if (endpoint === nextUrlCity) {
                setCityList([...cityList, ...res.data.results.map((city) => { return { label: city.name, value: city.id } })])
            }
            else {
                setCityList(res.data.results.map((city) => { return { label: city.name, value: city.id } }))
            }
            setNextUrlCity(res.data.next)
        }
        catch (err) {
            console.log(err)
        }
    }


    const loadDataDistrict = async (endpoint, keyword) => {
        try {
            const res = await Apis.get(`${endpoint}${keyword ? `?keyword=${keyword}` : ""}`)
            if (endpoint === nextUrlDistrict) {
                setDistrictList([...districtList, ...res.data.results.map((district) => { return { label: district.name, value: district.id } })])
            }
            else {
                setDistrictList(res.data.results.map((district) => { return { label: district.name, value: district.id } }))
            }
            setNextUrlDistrict(res.data.next)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (openCityList) {
            props.setDistrict(null)
            loadDataCity(endpoints['cities'], null)
        }
    }, [openCityList])

    useEffect(() => {
        if (props.city && openDistrictList) {
            loadDataDistrict(endpoints['districts'](props.city), null)
        }
    }, [openDistrictList])

    useEffect(() => {
        if (props.city && !(cityList.length)) {
            setCityList([{ label: props.cityName, value: props.city }])
        }
    }, [props.city])

    useEffect(() => {
        if (props.district && !(districtList.length)) {
            setDistrictList([{ label: props.districtName, value: props.district }])
        }
    }, [props.district])

    useEffect(() => {
        if (openCityList) {
            const timeoutId = setTimeout(() => {
                loadDataCity(endpoints['cities'], cityKeyword)
            }, 1000)
            return () => { clearTimeout(timeoutId) }
        }
    }, [cityKeyword])

    useEffect(() => {
        if (props.city && openDistrictList) {
            const timeoutId = setTimeout(() => {
                loadDataDistrict(endpoints['districts'](props.city), districtKeyword)
            }, 1000)
            return () => { clearTimeout(timeoutId) }
        }
    }, [districtKeyword])
    return (
        <>
            <View style={Styles.marginBottom10}>
                <DropDownPicker
                    style={[styles.cityList, Styles.borderRadius20, Styles.bgColorBFDBFE]}
                    open={openCityList}
                    value={props.city}
                    items={cityList}
                    setOpen={setOpenCityList}
                    setValue={props.setCity}
                    placeholder="chọn thành phố"
                    searchable={true}
                    onChangeSearchText={(text) => { setCityKeyword(text) }}
                    flatListProps={{
                        onEndReached: loadMoreDataCityHandler,
                        onEndReachedThreshold: 0.5,
                    }}
                    zIndex={1000}
                    dropDownContainerStyle={{ zIndex: 1000 }}
                />
            </View>
            <DropDownPicker
                style={[styles.districtList, Styles.borderRadius20, Styles.bgColorBFDBFE]}
                open={openDistrictList}
                value={props.district}
                items={districtList}
                setOpen={setOpenDistrictList}
                setValue={props.setDistrict}
                placeholder="chọn quận"
                searchable={true}
                onChangeSearchText={(text) => { setDistrictKeyword(text) }}
                flatListProps={{
                    onEndReached: loadMoreDataDistrictHandler,
                    onEndReachedThreshold: 0.5,
                }}
            />
        </>
    )
}
export default CityDistrict

const styles = StyleSheet.create({
    cityList: {
        borderWidth: 0,
        zIndex: 2
    },
    districtList: {
        borderWidth: 0,
        zIndex: 1
    }
})