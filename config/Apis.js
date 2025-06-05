import axios from "axios"

const BASE_URL = 'http://192.168.0.104:8000'

export const endpoints = {

    'cvs': '/users/cvs/',
    'current-user': '/users/current-user/',
    'cvs-detail': (id) => (`/cvs/${id}/`),
    'cvs-create': `/cvs/`,
    'cv-information': '/users/cv-information/',

    'chat-groups': '/users/chat-groups/',

    'experiences': '/users/experiences/',
    'experiences-create': '/experiences/',
    'experiences-detail': (id) => (`/experiences/${id}/`),

    'education-levels': `/users/education-levels/`,
    'education-levels-create': `/education-levels/`,
    'education-levels-detail': (id) => `/education-levels/${id}/`,

    'skills': '/users/skills/',
    'skills-create': '/skills/',
    'skills-detail': (id) => (`/skills/${id}/`),

    'job-postings': '/users/job-postings/',
    'job-postings-detail': (id) => (`/job-postings/${id}/`),
    'job-postings-create': '/job-postings/',
    'apply-job-postings': (id) => `/cvs/${id}/job-postings/`,

    'applies': (id) => `/job-postings/${id}/applies/`,
    'applies-details': (id) => (`/applies/${id}/`),
    'applies-create': '/applies/',
    'applies-more-infos-create': '/applies-more-infos/',

    'chat': '/users/chat/',

    'cities': '/cities/',
    'users': '/users/',
    'login': '/o/token/',
    'districts': (cityId) => (`/cities/${cityId}/districts/`),
    'job-search-criteria': '/users/job-search-criteria/',

}

export default axios.create({
    baseURL: BASE_URL
});