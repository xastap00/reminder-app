import Cookies from 'js-cookie'

async function CreateRemindersFun (host, date, desc) {
    return fetch(host + '/api/reminder/create', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + Cookies.get('token')
        },
        credentials: 'include',
        body: JSON.stringify({
            datetime: date,
            description: desc
        })
    })
    .then (res => {
        console.log(res.status)
    })
    .catch((e) => {
        console.log("fetch err");
    });
};

export default CreateRemindersFun