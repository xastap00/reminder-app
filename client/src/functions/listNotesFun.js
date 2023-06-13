import Cookies from 'js-cookie'

async function ListNotesFun (host) {
    try {
        const res = await fetch(host + '/api/reminder/listNotes', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + Cookies.get('token')
            },
            credentials: 'include'
        });
        return await res.json();
    } catch (e) {
        return null;
    }
};

export default ListNotesFun