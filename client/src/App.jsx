import { useCallback, useEffect, useState } from 'react';
import { useGetTodoList } from './hooks/useGetTodoList';
import { TodoList } from './components/todoList';
import { AddTodoItem } from './components/addTodoItem';

import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]); // Состояние для хранения списка задач

  const getTodoList = useGetTodoList(); // Получение функции для получения списка задач из кастомного хука

  const updateTodoList = useCallback(() => { // Функция для обновления списка задач после добавления новой задачи
    getTodoList().then((result) => setTodoList(result.todos));
  }, [getTodoList]);

  useEffect(() => { // Получение списка задач при загрузке компонента
    updateTodoList()
  }, [updateTodoList]);

  return (
    <div className="App">
      <h1>Мои задачи</h1>
      <TodoList todoList={todoList} updateTodoList={updateTodoList} />
      <br />
      <AddTodoItem updateTodoList={updateTodoList} />

    </div>
  );
}

export default App;
