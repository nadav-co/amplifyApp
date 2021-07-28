export function TodoList({ todos, deleteTodo, edit }) {

    const onDeleteTodo = (ev, todo) => {
        ev.stopPropagation()
        deleteTodo(todo)
    }

    return (
        <section className="todo-list">
            {
                todos.map(todo => (
                    <div className="todo-preview" onClick={() => edit({...todo})} key={todo.id || todo.name}>
                        <h2>{todo.name}</h2>
                        <p>{todo.description}</p>
                        <button onClick={(ev) => onDeleteTodo(ev, todo)}>Delete todo</button>
                    </div>
                ))
            }
        </section>
    )

}