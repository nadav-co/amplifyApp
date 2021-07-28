import { useEffect, useState } from "react";

const initialFormState = { name: '', description: '' }

export function TodoEdit({ saveTodo, todoToEdit }) {

    const [formData, setFormData] = useState(initialFormState);
    useEffect(() => {
        todoToEdit && setFormData({ ...todoToEdit })
    }, [todoToEdit])

    const onSaveTodo = () => {
        saveTodo(formData)
        setFormData(initialFormState)
    }

    return (
        <section className="todo-edit">
            <input
                onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                placeholder="Todo name"
                value={formData.name}
            />
            <input
                onChange={e => setFormData({ ...formData, 'description': e.target.value })}
                placeholder="Todo description"
                value={formData.description}
            />
            <section className="button-container">
                <button onClick={onSaveTodo}>Create Todo</button>
                {(formData.name || formData.description) &&
                    <button onClick={() => setFormData(initialFormState)}>Cancel</button>}
            </section>
        </section>
    )
}