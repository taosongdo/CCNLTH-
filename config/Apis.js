import axios from "axios"

const BASE_URL = 'http://192.168.0.102:8000'

export const endpoints = {
    'job-postings': '/users/job-postings/',
    'job-postings-detail': (id) => (`/job-postings/${id}/`),
    'cvs': '/cvs/',
    'current-user': '/users/current-user/',
    'cvs-detail': (id) => (`/cvs/${id}/`),
    'cv-information': '/users/cv-information/',

    'experiences': '/users/experiences/',
    'experiences-create': '/experiences/',
    'experiences-detail': (id) => (`/experiences/${id}/`),

    'education-levels': `/users/education-levels/`,
    'education-levels-create': `/education-levels/`,
    'education-levels-detail': (id) => `/education-levels/${id}/`,

    'skills': '/users/skills/',
    'skills-create': '/skills/',
    'skills-detail': (id) => (`/skills/${id}/`),

    'cities': '/cities/',
    'users': '/users/',
    'districts': (cityId) => (`/cities/${cityId}/districts/`),
    'job-search-criteria': '/users/job-search-criteria/',

}

export default axios.create({
    baseURL: BASE_URL
});