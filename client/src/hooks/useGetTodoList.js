import { useCallback } from "react";
import { useApi } from "./useApi";

// Кастомный хук для получения списка задач с сервера.
// Он возвращает функцию, которая при вызове отправляет GET-запрос на сервер и возвращает результат в виде JSON. 
// Использование useCallback позволяет мемоизировать эту функцию, чтобы она не пересоздавалась при каждом рендере компонента.

export const useGetTodoList = () => {
    const api = useApi();

    return useCallback(async () => {
        const resp = await api('http://localhost:3002/api/todos/list', 'get');

        if (!resp.ok) {
            throw new Error(resp.error || 'Не удалось загрузить список задач');
        }
        
        return resp.data;
    }, [api]);
};