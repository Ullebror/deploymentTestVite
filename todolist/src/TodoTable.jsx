import React from 'react';


function TodoTable(props) {

    return (
        <div>
            <table >
                <tbody>
                    <tr><th>Date</th><th>Priority</th><th>Description</th> </tr>
                    {
                        props.todos.map((todo, index) => 
                            <tr key={index}>
                                <td>{todo.date}</td>
                                <td>{todo.priority}</td>
                                <td>{todo.description}</td> 
                                
                                <td><button onClick={() => props.deleteTodo(index)}>Delete</button></td>
                            </tr>)
        }
        </tbody>
      </table> 
        </div>
    );
}

export default TodoTable;
