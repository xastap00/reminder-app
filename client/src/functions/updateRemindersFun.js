import Cookies from 'js-cookie'

async function UpdateRemindersFun (host, item) {
    return fetch(host + '/api/reminder/update', {
        method: 'put',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + Cookies.get('token')
        },
        credentials: 'include',
        body: JSON.stringify({
            reminder_id: item.id,
            data: item.data
        })
    })
    .then (res => {
        console.log(res.status)
    })
    .catch((e) => {
        console.log("fetch err");
    });
};

export default UpdateRemindersFun