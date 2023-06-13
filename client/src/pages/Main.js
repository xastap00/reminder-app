import './Main.css'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import SignInFun from '../functions/singInFun';
import ListNotesFun from '../functions/listNotesFun';
import ListRemindersFun from '../functions/listRemindersFun';
import UpdateRemindersFun from '../functions/updateRemindersFun';
import DeleteRemindersFun from '../functions/deleteRemindersFun';

function Main() {

    const host = 'http://localhost:4000'

    const [notes, setNote] = useState([]);
    const [remindersDone, setRemindersDone] = useState([]);
    const [remindersToBeDone, setRemindersToBeDone] = useState([]);
    
    useEffect( () => {
        (async () => {
            SignInFun(host);
            const notesData = await ListNotesFun(host);
            const [firstRemindersDone, firstRemindersToBeDone] = await ListRemindersFun(host);
            if (!notesData || !firstRemindersDone || !firstRemindersToBeDone) {
                return;
            }
            setNote(notesData);
            setRemindersDone(firstRemindersDone);
            setRemindersToBeDone(firstRemindersToBeDone);
        })();
    }, []);

    const [dataUpd, setDataUpd] = useState();

    const dataChange = (e, id, doneFlag) => {       
        const reminder = remindersToBeDone.filter(reminder => reminder.reminder_id === id);
        const newReminder = [...reminder];
        const itemInReminder = newReminder[0];
        if (doneFlag === 1) {
            itemInReminder.done = true;
        } else {
            itemInReminder[e.target.name] = e.target.value;
        }
        const {reminder_id, ...newData} = newReminder[0];
        const dataToUdp = {
            id: reminder_id,
            data: newData
        };
        setDataUpd(dataToUdp);
    };

    useEffect( () => {
        (async () => {
            if(!dataUpd){
                return;
            }
                UpdateRemindersFun(host, dataUpd);
                const [newRemindersDone, newRemindersToBeDone] = await ListRemindersFun(host);
                setRemindersDone(newRemindersDone);
                setRemindersToBeDone(newRemindersToBeDone);
        })();
    }, [dataUpd]);

    const [dataDel, setDataDel] = useState();

    const deleteReminder = (id) => {
        setDataDel(id);
    };

    useEffect( () => {
        (async () => {
            if(!dataDel){
                return;
            }
                console.log(dataDel);
                DeleteRemindersFun(host, dataDel);
                const [newRemindersDone, newRemindersToBeDone] = await ListRemindersFun(host);
                setRemindersDone(newRemindersDone);
                setRemindersToBeDone(newRemindersToBeDone);
        })();
    }, [dataDel]);

    return (
        <div className = 'main-container'>
            <div className= 'title-container'>
                <h1 className = 'title'> Reminders </h1>
            </div>
            <div className = 'table'>
                <Tabs
                    defaultActiveKey="Inbox"
                    id="main-table"
                    className="mb-3"
                >
                    <Tab eventKey="Snoozed" title="Snoozed">
                            {notes.map((note) => {
                                return (
                                    <div className = 'note'>{note.content}</div>
                                );
                            })}
                    </Tab>
                    <Tab eventKey="Inbox" title="Inbox">                       
                            {remindersToBeDone.map((reminderToBeDone) => {
                                return (
                                    <div className = 'reminder' key = {reminderToBeDone.id}>
                                        <Container>
                                            <Row className = 'reminder-grid-row'>
                                                <Col>
                                                    <Form.Group controlId = {reminderToBeDone.reminder_id}>
                                                        <Form.Control
                                                            name = 'date'
                                                            type = 'datetime-local'
                                                            defaultValue = {moment(reminderToBeDone.date).format('YYYY-MM-DD HH:mm')}
                                                            onChange = {(e) => dataChange(e, reminderToBeDone.reminder_id, 0)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}> 
                                                    <Form.Group controlId = {reminderToBeDone.reminder_id}>
                                                        <Form.Control
                                                            name = 'description'
                                                            as = 'textarea'
                                                            rows = {1}
                                                            onChange = {(e) => dataChange(e, reminderToBeDone.reminder_id, 0)}
                                                            defaultValue={reminderToBeDone.description}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col className = 'button-section'>
                                                    <FontAwesomeIcon icon={faTrash} className = 'icon' onClick = {() => deleteReminder(reminderToBeDone.reminder_id)}/>
                                                    <FontAwesomeIcon icon={faCheck} className = 'icon' onClick = {(e) => dataChange(e, reminderToBeDone.reminder_id, 1)}/>    
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                )
                            })}
                    </Tab>
                    <Tab eventKey="Done" title="Done">
                            {remindersDone.map((reminderDone) => {
                                return (
                                    <div className = 'reminder'>
                                        <Container>
                                            <Row className = 'reminder-grid-row'>
                                                <Col>
                                                    {moment(reminderDone.date).format('YYYY-MM-DD HH:mm')}
                                                </Col>
                                                <Col xs={6}>
                                                    {reminderDone.description}
                                                </Col>
                                                <Col className = 'button-section'>
                                                    <FontAwesomeIcon icon={faTrash} className = 'icon' onClick = {() => deleteReminder(reminderDone.reminder_id)}/>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                )
                            })}
                    </Tab>
                    <Tab eventKey="Add new" title="Add new">
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};
export default Main;