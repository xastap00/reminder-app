import './Main.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useEffect } from 'react';
import TabPanel from '../components/TabPanel';
import request from '../request';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Main() {
    const [value, setValue] = React.useState(0);
    useEffect( () => {
        request('/api/reminder/list', {
            method: 'get',
            // headers: {
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify({
            //     username: 'Ilya',
            //     password: 'Ilya'
            // })
            
        })
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className = 'container'>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
            
            <TabPanel value={value} index={0}>
                Женя лучший!    
            </TabPanel>
            <TabPanel value={value} index={1}>
                Женя лучший!!
            </TabPanel>
            <TabPanel value={value} index={2}>
                Женя лучший!!!
            </TabPanel>
        </div>
    );
}

export default Main;