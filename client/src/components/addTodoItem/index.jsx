import { useState } from 'react';

export const AddTodoItem = ({ updateTodoList }) => {

    const [title, setTitle] = useState(null); // Состояние для хранения значения поля ввода

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3002/api/todos/add", {
                method: "post",
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
            setTitle(''); // Очистка поля ввода после добавления задачи


        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <br />
            <button type="submit">Добавить</button>
        </form>
    )
}