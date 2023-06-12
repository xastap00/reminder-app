import Cookies from 'js-cookie'

const host = 'http://localhost:4000'

function request (resource, options) {
// TODO check resource signIn\Up ending ? token given or not
    fetch(host + resource, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: 'Bearer ' + Cookies.get('token')  
        },
        credentials: 'include'
    }).then (res => {
        console.log(res.status)
        return res.json();
    })
}

export default request