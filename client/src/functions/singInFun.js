import Cookies from 'js-cookie'

async function SignInFun (host) {
    return fetch(host + '/api/user/signIn', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + Cookies.get('token')
        },
        credentials: 'include',
        body: JSON.stringify({
            username: 'test',
            password: 'test'
        })
    })
    .then (res => {
        console.log(res.status)
        return res.json();
    })
    .catch((e) => {
        console.log("fetch err");
    });
};

export default SignInFun