import { useState } from 'react';

export const TodoList = ({ todoList, updateTodoList }) => {
    const [editingTitle, setEditingTitle] = useState(null); // Состояние для хранения текущего редактируемого названия задачи
    const [newTitle, setNewTitle] = useState(''); // Состояние для хранения нового значения поля ввода при редактировании


    //----- Функция для удаления задачи по названию -----//
    const deleteTodoItem = async (title) => {
        try {
            const res = await fetch("http://localhost:3002/api/todos/delete", {
                method: "delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title //: значение поля ввода, которое будет отправлено на сервер
                })
            })

            if (res.status !== 200) { // Если статус ответа не 200, выводим сообщение об ошибке
                const json = await res.json()
                alert(json.message)
                return;
            }
            updateTodoList(); // Обновление списка задач после успешного добавления новой задачи
        } catch (error) {
            console.log(error);
        }
    }

    //----- Функция для начала редактирования задачи -----//
    const startEdit = (title) => {
        setEditingTitle(title); // Устанавливаем текущее редактируемое название задачи
        setNewTitle(title);     // Устанавливаем новое значение поля ввода равным текущему названию задачи
    };

    //----- Функция для редактирования -----//
    const saveEdit = async () => {
        try {
            const res = await fetch("http://localhost:3002/api/todos/edit", {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ oldTitle: editingTitle, newTitle })
            });

            if (res.status !== 200) {
                const json = await res.json();
                alert(json.message);
                return;
            }

            setEditingTitle(null);
            setNewTitle('');
            updateTodoList();
        } catch (error) {
            console.log(error);
        }
    };

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