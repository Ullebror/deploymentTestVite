import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

function TodoList() {
  const [todo, setTodo] = useState({description: '', date: '', priority: ''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [columnDefs] = useState([
    { field: 'description', sortable: true, filter: true, floatingFilter: true },
    { field: 'priority', sortable: true, filter: true, floatingFilter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
    },
    { field: 'date', sortable: true, filter: true, floatingFilter: true }
  ]);


  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const changeDateFunc = (date) => {
    date = date.toIsoString();
    inputChanged(date);
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: '', priority: ''})
    
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((todo, index) =>
        index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
        alert('Please select a row first');
        }
    
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={2} justifyContent="center" alingItems="center">
          <TextField
            label="Description"
            variant="standard"
            name="description" value={todo.description}
            onChange={inputChanged}/>
          <TextField 
            label="Priority"
            variant="standard"
            name="priority" value={todo.priority}
            onChange={inputChanged}/>
          <DatePicker value={todo.date} onChange={(date) => changeDateFunc(date)} />
          <Button onClick={addTodo} variant="contained">Add </Button>
          <Button onClick={deleteTodo} variant="contained">Delete</Button>
        </Stack>
      </LocalizationProvider>


      <div className='ag-theme-material' style={{ width: '100%', height: 500, alignItems: 'center'}}>
        <AgGridReact
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api }
            rowSelection='single'
            animateRows={true}
            rowData={todos}
            columnDefs={columnDefs}
        />

      </div>

        
      </>
  );
}

export default TodoList;

/* <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input onChange= {inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/> 
      
    <TextField 
            label="Date"
            variant="standard"
            name="date" value={todo.date}
            onChange={inputChanged}/>*/