import Cookies from 'js-cookie'

async function DeleteRemindersFun (host, id) {
    return fetch(host + '/api/reminder/delete', {
        method: 'delete',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + Cookies.get('token')
        },
        credentials: 'include',
        body: JSON.stringify({
            reminder_id: id,
        })
    })
    .then (res => {
        console.log(res.status)
    })
    .catch((e) => {
        console.log("fetch err");
    });
};

export default DeleteRemindersFun