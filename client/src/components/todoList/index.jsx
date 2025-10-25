export const TodoList = ({ todoList, updateTodoList }) => {

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
    return <>
        {
            !todoList.length && <>Загрузка...</>
        }
        {
            todoList.map((item) => <div key={item._id}>
                {item.title} &nbsp;
                <span onClick={() => deleteTodoItem(item.title)}>Удалить</span>
            </div>)
        }
    </>;
}