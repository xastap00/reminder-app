import './Main.css'
import React, { useEffect, useState } from 'react';
import request from '../request';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

function Main() {

    const host = 'http://localhost:4000'

    useEffect( () => {
        request('/api/user/signIn', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: 'test',
                password: 'test'
            })
        })
    })


    // const response = await request('/api/reminder/listNotes', {
    //     method: 'post',
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    //     });
    // const data = await response.json();
    // setNote(data);

    const [notes, setNote] = useState([]);
    useEffect( () => {
        fetch(host + '/api/reminder/listNotes', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + Cookies.get('token')
            },
            credentials: 'include'
        })
        .then(async (res) => { 
            const data = await res.json()
            console.log(data);
            setNote(data);
        })
        .catch((e) => {
            console.log("fetch err");
        });
    }, []);

    const [reminders, setReminders] = useState([]);
    useEffect( () => {
        fetch(host + '/api/reminder/list', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + Cookies.get('token')
            },
            credentials: 'include'
        })
        .then(async (res) => { 
            const data = await res.json()
            console.log(data);
            setReminders(data);
        })
        .catch((e) => {
            console.log("fetch err");
        });
    }, []);

    return (
        <div className = 'container'>
            <div className= 'title-container'>
                <h1 className = 'title'> Reminders </h1>
                <div className= 'add-button'> <Button variant="outline-dark">Add new</Button> </div>
            </div>
            <div className = 'table'>
                <Tabs
                    defaultActiveKey="Inbox"
                    id="main-table"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="Snoozed" title="Snoozed">
                            {notes.map((note) => {
                                return (
                                    <div className = 'note'>{note.content}</div>
                                );
                            })}
                    </Tab>
                    <Tab eventKey="Inbox" title="Inbox">
                        <div className = 'reminder'>
                            test
                        </div>
                    </Tab>
                    <Tab eventKey="Done" title="Done">
                        <div className = 'reminder'>
                            {/* <UserReservation court={court.name} date_start={moment(item.date_start).format('DD.MM.YYYY HH:mm')} date_end={moment(item.date_end).format('DD.MM.YYYY HH:mm')} addres={item.address}/>
                            <div className={styles["heart-div"]}>
                                    <FontAwesomeIcon icon={faRectangleXmark} className={styles["heart"]}/>
                            </div> */}
                            test
                        </div>
                    </Tab>  
                </Tabs>
            </div>
        </div>
    );
  };
export default Main;