import { useEffect, useState } from "react";
import { API } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { updateTodo as updateTodoMutation, createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../graphql/mutations';
import { TodoList } from "./TodoList";
import { TodoEdit } from "./TodoEdit";


export function Todo() {

    const [todos, setTodos] = useState([])
    const [todoToEdit, setTodoToEdit] = useState(null)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        const apiData = await API.graphql({ query: listTodos });
        setTodos(apiData.data.listTodos.items);
    }

    const deleteTodo = async ({ id }) => {
        const newTodosArray = todos.filter(todo => todo.id !== id);
        setTodos(newTodosArray);
        await API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
    }

    const createTodo = async (data) => {
        if (!data.name || !data.description) return;
        try {
            await API.graphql({ query: createTodoMutation, variables: { input: data } });
            setTodos([...todos, data]);
        } catch (e) {
            console.log(e.errors[0].message);
        }
    }

    const updateTodo = async (data) => {

        delete data.createdAt
        delete data.updatedAt

        try {
            await API.graphql({ query: updateTodoMutation, variables: { input: data } });
            const newTodos = todos.map(todo => todo.id === data.id ? data : todo)
            setTodos(newTodos);
        } catch (e) {
            console.log(e.errors[0].message);
        }
    }

    const saveTodo = async (data) => {
        await data.id ? updateTodo(data) : createTodo(data)
        setTodoToEdit(null)
    }

    return (
        <main className="todos-container">
            <h1 className="title">Todos</h1>
            <TodoEdit todoToEdit={todoToEdit} saveTodo={saveTodo} />
            <TodoList todos={todos} deleteTodo={deleteTodo} edit={setTodoToEdit} />
        </main>
    )
}