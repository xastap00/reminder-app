import Cookies from 'js-cookie'

function DeleteRemindersFun (host, id) {
    fetch(host + '/api/reminder/delete', {
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