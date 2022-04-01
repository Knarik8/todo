import React from "react";

const TodoItem = ({todo}) => {

    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.article}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.updated}
            </td>
            <td>
                {todo.is_active}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {

    return(
        <table>
            <th>
                Project
            </th>
            <th>
                Article
            </th>
            <th>
                User
            </th>
            <th>
                Created
            </th>
            <th>
                Updated
            </th>
            <th>
                Is_active
            </th>
            {todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )
}

export default TodoList


