import { StyleSheet, View } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useState, useContext } from "react"
import Styles from "../../Styles"
import Apis, { endpoints } from "../../config/Apis"
import InputBar from "../InputBar"
import { UserContext } from "../../config/AppContext"
import TouchButton from "../TouchButton"
import LoadPage from "../LoadPage"
import CityDistrict from "../CityDistrict"


const JobSearchCriteria = () => {
    const { access_token } = useContext(UserContext)
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
    const [job, setJob] = useState()
    const [applicantId, setApplicantId] = useState()
    const [loading, setLoading] = useState(true)
    const [city, setCity] = useState()
    const [cityName, setCityName] = useState()
    const [district, setDistrict] = useState()
    const [districtName, setDistrictName] = useState()

    const loadJobSearchCriteria = async () => {
        try {
            const res = await Apis.get(endpoints['job-search-criteria'], {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            if (!(res.data.message)) {
                setApplicantId(res.data.applicant)
                setCity(res.data.district.city.id)
                setCityName(res.data.district.city.name)
                setDistrict(res.data.district.id)
                setDistrictName(res.data.district.name)
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
                        Authorization: `Bearer ${access_token}`
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
                        Authorization: `Bearer ${access_token}`
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





    if (loading) {
        return (
            <LoadPage />
        )
    }
    return (
        <View style={[Styles.flex1, Styles.bgColorF8FAFC]}>
            <View style={Styles.p10}>
                <InputBar value={job} TextChangeHandler={setJob} placeholder={"điền tên công việc"} />
            </View>
            <View style={Styles.p10}>
                <CityDistrict city={city} setCity={setCity} cityName={cityName} setDistrict={setDistrict} district={district} districtName={districtName} />
            </View>
            <View style={Styles.p10}>
                <DropDownPicker
                    style={[styles.jobTypeList, Styles.borderRadius20, Styles.bgColorBFDBFE]}
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

})