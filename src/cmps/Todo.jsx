import { useEffect, useState } from "react";
import { API } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { updateTodo as updateTodoMutation, createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../graphql/mutations';
import { TodoList } from "./TodoList";
import { TodoEdit } from "./TodoEdit";
import { userService } from "../services/userService";
import { useQuery } from "@apollo/client";



export function Todo() {

    const [todos, setTodos] = useState([])
    const [username, setUsername] = useState('')
    const [todoToEdit, setTodoToEdit] = useState(null)

    const { isLoading, error, queryTodos } = useQuery(listTodos);

    useEffect(() => {
        const username = userService.getUsername()
        if (!username) return
        setUsername(username)
    }, [])

    useEffect(() => {
        if (!username) return
        fetchTodos()
        setUsername(username)
    }, [username])

    useEffect(() => {
        // setTodos(queryTodos)
        console.log(queryTodos);
        console.log(error);
    }, [queryTodos])

    const fetchTodos = async () => {
        const apiData = await API.graphql({
            query: listTodos, variables: { filter: { username: { eq: username } }}
        });
        setTodos(apiData.data.listTodos.items);
    }

    const deleteTodo = async ({ id }) => {
        const newTodosArray = todos.filter(todo => todo.id !== id);
        setTodos(newTodosArray);
        await API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
    }

    const createTodo = async (data) => {
        if (!data.name || !data.description || !username) return;
        try {
            data.username = username
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
            {isLoading ?
                <h3>Loading</h3> :
                error ?
                    <h3>error</h3> :
                    <TodoList todos={todos} deleteTodo={deleteTodo} edit={setTodoToEdit} />
            }
        </main>
    )
}