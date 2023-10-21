import React, { useState } from 'react';
import TodoList from './TodoList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabApp() {
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    }

    return (<div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Home" />
            <Tab value="two" label="Todos" />
        </Tabs>
        {value === 'one' &&  <div>Hello World </div>}
        {value === 'two' &&  <div> <TodoList /></div>}
    </div>
    );
}

export default TabApp;