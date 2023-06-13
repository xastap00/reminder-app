import Cookies from 'js-cookie'

async function ListRemindersFun (host) {
    try {
        const res = await fetch(host + '/api/reminder/list', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + Cookies.get('token')
            },
            credentials: 'include'
        });
        const data = await res.json();

        // Sorting by date from the oldest
        data.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        const remindersDone = [];
        const remindersToBeDone = [];

        // Sorting by status (done or not)
        for (let i = 0; i < data.length; i++) {
            
            if (data[i].done === true) {
                remindersDone.push(data[i]);
            } else {
                remindersToBeDone.push(data[i]);
            }
        }
        return [remindersDone, remindersToBeDone];
    } catch (e) {
        return null;
    }
};

export default ListRemindersFun