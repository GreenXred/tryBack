import { useState } from 'react';
import { useApi } from '../../hooks/useApi';

export const TodoList = ({ todoList, updateTodoList }) => {
    const api = useApi();

    const [editingTitle, setEditingTitle] = useState(null); // Состояние для хранения текущего редактируемого названия задачи
    const [newTitle, setNewTitle] = useState(''); // Состояние для хранения нового значения поля ввода при редактировании


    //----- Функция для удаления задачи по названию -----//
    const deleteTodoItem = async (title) => {
        const resp = await api("http://localhost:3002/api/todos/delete", "delete", {
            title: title
        });

        if (!resp.ok) {
            alert(resp.error);
            return;
        }

        updateTodoList();
    };

    //----- Функция для начала редактирования задачи -----//
    const startEdit = (title) => {
        setEditingTitle(title); // Устанавливаем текущее редактируемое название задачи
        setNewTitle(title);     // Устанавливаем новое значение поля ввода равным текущему названию задачи
    };

    //----- Функция для редактирования -----//
    const saveEdit = async () => {
        if (!editingTitle) return;

        const trimmed = (newTitle || '').trim();
        if (!trimmed) {
            alert('Заголовок не может быть пустым');
            return;
        }

        const resp = await api("http://localhost:3002/api/todos/edit", "put", {
            oldTitle: editingTitle,
            newTitle: trimmed
        });

        if (!resp.ok) {
            alert(resp.error);
            return;
        }
        setEditingTitle(null);
        setNewTitle('');
        updateTodoList();
    }

    return (
        <>
            {!todoList.length && <>Загрузка...</>}

            {todoList.map((item) => (
                <div key={item._id}>

                    {editingTitle === item.title ? (
                        <>
                            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                            &nbsp;
                            <button onClick={saveEdit}>Сохранить</button>
                        </>
                    ) : (
                        <>
                            {item.title}
                            &nbsp;|&nbsp;
                            <span onClick={() => startEdit(item.title)} style={{ fontWeight: 'bold', cursor: 'pointer' }}>Редактировать</span>
                            &nbsp;|&nbsp;
                            <span onClick={() => deleteTodoItem(item.title)} style={{ fontWeight: 'bold', cursor: 'pointer' }}>Удалить</span>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};