import { StyleSheet, View } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useState, useContext } from "react"
import Styles from "../../Styles"
import Apis, { endpoints } from "../../config/Apis"
import InputBar from "../InputBar"
import { userContext } from "../../App"
import TouchButton from "../TouchButton"
import LoadPage from "../LoadPage"


const JobSearchCriteria = () => {
    const { token } = useContext(userContext)
    const [jobType, setJobType] = useState("")
    const [jobTypeList, setJobTypeList] = useState([
        { label: "Full-Time", value: 1 },
        { label: "Part-Time", value: 2 },
        { label: "Contract", value: 3 },
        { label: "Internship", value: 4 },
        { label: "Freelance", value: 5 },
        { label: "Temporary", value: 6 },
        { label: "Remote-work", value: 7 },
        { label: "Orders", value: 8 },
        { label: "BLANK", value: null },
    ])
    const [openJobTypeList, setOpenJobTypeList] = useState(false);

    const [openCityList, setOpenCityList] = useState(false)
    const [city, setCity] = useState()
    const [cityList, setCityList] = useState([])
    const [nextUrlCity, setNextUrlCity] = useState()
    const [cityKeyword, setCityKeyword] = useState()

    const [openDistrictList, setOpenDistrictList] = useState(false)
    const [district, setDistrict] = useState()
    const [districtList, setDistrictList] = useState([])
    const [nextUrlDistrict, setNextUrlDistrict] = useState()
    const [districtKeyword, setDistrictKeyword] = useState()

    const [job, setJob] = useState()

    const [applicantId, setApplicantId] = useState()

    const [loading, setLoading] = useState(true)

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
    const loadMoreDataCityHandler = () => {
        if (nextUrlCity) {
            loadDataCity(nextUrlCity, null)
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
    const loadMoreDataDistrictHandler = () => {
        if (nextUrlDistrict) {
            loadDataDistrict(nextUrlDistrict, null)
        }
    }
    const loadJobSearchCriteria = async () => {
        try {
            const res = await Apis.get(endpoints['job-search-criteria'], {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!(res.data.message)) {
                setApplicantId(res.data.applicant)
                setCity(res.data.district.city.id)
                setCityList([{ label: res.data.district.city.name, value: res.data.district.city.id }])
                setDistrict(res.data.district.id)
                setDistrictList([{ label: res.data.district.name, value: res.data.district.id }])
                setJob(res.data.job)
                setJobType(res.data.job_type)
            }
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const updateJobSearchCriteria = async () => {
        try {
            if (applicantId) {
                const res = await Apis.patch(endpoints['job-search-criteria'], {
                    district: district,
                    job: job,
                    job_type: jobType
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
            else {
                const res = await Apis.post(endpoints['job-search-criteria'], {
                    district: district,
                    job: job,
                    job_type: jobType
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setApplicantId(res.data.applicant)
            }
      
        }
        catch (err) {
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        loadJobSearchCriteria()
    
    }, [])

    useEffect(() => {
        if (city && openDistrictList) {
            loadDataDistrict(endpoints['districts'](city), null)
        }
    }, [openDistrictList])

    useEffect(() => {
        if (openCityList) {
            setDistrict(null)
            loadDataCity(endpoints['cities'], null)
        }
    }, [openCityList])

    useEffect(() => {
        if (openCityList) {
            const timeoutId = setTimeout(() => {
                loadDataCity(endpoints['cities'], cityKeyword)
            }, 1000)
            return () => { clearTimeout(timeoutId) }
        }
    }, [cityKeyword])

    useEffect(() => {
        if (city) {
            const timeoutId = setTimeout(() => {
                loadDataDistrict(endpoints['districts'](city), districtKeyword)
            }, 1000)
            return () => { clearTimeout(timeoutId) }
        }
    }, [districtKeyword])

    if (loading) {
        return (
            <LoadPage />
        )
    }
    return (
        <View style={[Styles.flex1, Styles.bgColorBFDBFE]}>
            <View style={Styles.p10}>
                <InputBar value={job} TextChangeHandler={setJob} placeholder={"điền tên công việc"} />
            </View>
            <View style={Styles.p10}>
                <DropDownPicker
                    style={[styles.cityList, Styles.borderRadius20, Styles.bgColorF8FAFC]}
                    open={openCityList}
                    value={city}
                    items={cityList}
                    setOpen={setOpenCityList}
                    setValue={setCity}
                    placeholder="chọn thành phố"
                    searchable={true}
                    onChangeSearchText={(text) => { setCityKeyword(text) }}
                    flatListProps={{
                        onEndReached: loadMoreDataCityHandler,
                        onEndReachedThreshold: 0.5,
                    }}
                />
            </View>
            <View style={Styles.p10}>
                <DropDownPicker
                    style={[styles.districtList, Styles.borderRadius20, Styles.bgColorF8FAFC]}
                    open={openDistrictList}
                    value={district}
                    items={districtList}
                    setOpen={setOpenDistrictList}
                    setValue={setDistrict}
                    placeholder="chọn quận"
                    searchable={true}
                    onChangeSearchText={(text) => { setDistrictKeyword(text) }}
                    flatListProps={{
                        onEndReached: loadMoreDataDistrictHandler,
                        onEndReachedThreshold: 0.5,
                    }}
                />

            </View>
            <View style={Styles.p10}>
                <DropDownPicker
                    style={[styles.jobTypeList, Styles.borderRadius20, Styles.bgColorF8FAFC]}
                    open={openJobTypeList}
                    value={jobType}
                    items={jobTypeList}
                    setOpen={setOpenJobTypeList}
                    setValue={setJobType}
                    placeholder="Chọn loại hình làm việc"
                />
            </View>
            <View style={Styles.p10}>
                <TouchButton backgroundColor={"blue"} title={applicantId ? 'cập nhật tiêu chí công việc' : 'tạo tiêu chí công việc'} pressHandler={updateJobSearchCriteria} />
            </View>
        </View>
    )
}

export default JobSearchCriteria

const styles = StyleSheet.create({
    jobTypeList: {
        borderWidth: 0,
        zIndex: 1
    },
    cityList: {
        borderWidth: 0,
        zIndex: 2
    },
    districtList: {
        borderWidth: 0,
        zIndex: 1
    }

})