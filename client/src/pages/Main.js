import './Main.css'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'; 
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'; 
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import SignInFun from '../functions/singInFun';
import ListNotesFun from '../functions/listNotesFun';
import ListRemindersFun from '../functions/listRemindersFun';
import UpdateRemindersFun from '../functions/updateRemindersFun';
import DeleteRemindersFun from '../functions/deleteRemindersFun';
import CreateRemindersFun from '../functions/createRemindersFun';

function Main() {

    const host = 'http://localhost:4000'

    const [notes, setNote] = useState([]);
    const [remindersDone, setRemindersDone] = useState([]);
    const [remindersToBeDone, setRemindersToBeDone] = useState([]);
    const [date, setDate] = useState(moment());
    const [time, setTime] = useState(moment());
    const [description, setDescription] = useState('');
    const [currentTab, setCurrentTab] = useState();

    async function loadData () {
        const [newRemindersDone, newRemindersToBeDone] = await ListRemindersFun(host);
        setRemindersDone([...newRemindersDone]);
        setRemindersToBeDone([...newRemindersToBeDone]);
    }
    
    useEffect( () => {
        (async () => {
            SignInFun(host);
            const notesData = await ListNotesFun(host);
            const [firstRemindersDone, firstRemindersToBeDone] = await ListRemindersFun(host);
            if (!notesData || !firstRemindersDone || !firstRemindersToBeDone) {
                return;
            }
            setNote([...notesData]);
            setRemindersDone([...firstRemindersDone]);
            setRemindersToBeDone([...firstRemindersToBeDone]);
        })();
    }, []);

    const dataChange = async (e, id, doneFlag) => {       
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
        await UpdateRemindersFun(host, dataToUdp);
        await loadData();
    };

    const deleteReminder = async (id) => {
        await DeleteRemindersFun(host, id);
        await loadData();
    };

    const handleCancel = () => {
        setDescription('');
        setDate(moment());
        setTime(moment());
    };

    const handleOk = async () => {
        if (description.length > 0) {
            const datetime = date.clone();
            datetime.set({
                hour: time.get('hour'),
                minute: time.get('minute'),
                second: 0,
                millisecond: 0
            })
            handleCancel();        
            await CreateRemindersFun(host, datetime, description);
            await loadData();
            setCurrentTab('Inbox');
        } else {
            return;
        }
    };
    
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
                    activeKey={currentTab}
                    onSelect={(eventKey) => {
                        setCurrentTab(eventKey);
                    }}
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
                                                            className = 'form-control-inbox'
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
                                                            className = 'form-control-inbox'
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
                        <Container>
                            <Row>
                                <Col xs = {9}>
                                    <Form.Control
                                        name = 'description'
                                        as = 'input'
                                        placeholder='Remind me about...'
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}  
                                    />
                                </Col>
                                <Col className = 'addNew-button-section'>
                                    <Button variant = 'danger' onClick = {handleCancel}> 
                                        CANSEL
                                    </Button>
                                    <Button variant = 'primary' onClick = {handleOk}>
                                        OK 
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs = {6}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <StaticDatePicker
                                            orientation="portrait"
                                            openTo="day"
                                            disablePast = {true}
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Col>
                                <Col xs = {6}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <StaticTimePicker
                                            ampm = {false}
                                            value={time}
                                            orientation="portrait"
                                            onChange={(newValue) => {
                                                setTime(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Col>
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};
export default Main;