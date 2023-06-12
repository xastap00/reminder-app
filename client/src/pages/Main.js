import './Main.css'
// import React, { useEffect } from 'react';
// import request from '../request';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

function Main() {

    // const [value, setValue] = React.useState(0);
    // useEffect( () => {
    //     request('/api/user/signIn', {
    //         method: 'get',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             username: 'Ilya',
    //             password: 'Ilya'
    //         })
            
    //     })
    // })

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
                        Tab content for Home
                    </Tab>
                    <Tab eventKey="Inbox" title="Inbox">
                        <div className = 'reminder'>
                            {/* <UserReservation court={court.name} date_start={moment(item.date_start).format('DD.MM.YYYY HH:mm')} date_end={moment(item.date_end).format('DD.MM.YYYY HH:mm')} addres={item.address}/>
                            <div className={styles["heart-div"]}>
                                    <FontAwesomeIcon icon={faRectangleXmark} className={styles["heart"]}/>
                            </div> */}
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