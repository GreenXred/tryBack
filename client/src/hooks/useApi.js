import { useCallback } from "react";

export const useApi = () => {
    const callApi = useCallback(async (url, method, body) => {
        try {
            const options = { method: method || 'get', headers: {} };

            // посылаем только если есть тело запроса, иначе оставляем его undefined для GET-запросов
            if (body !== undefined && body !== null) {
                options.headers['Accept'] = 'application/json';
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(body);
            }

            const res = await fetch(url, options);

            const text = await res.text();
            let json = null;
            try {
                json = text ? JSON.parse(text) : null;
            } catch (e) {

            }

            // проверка статуса
            if (res.status < 200 || res.status >= 300) {
                const message = json && json.message ? json.message : 'HTTP ' + res.status;
                return {
                    ok: false,
                    status: res.status,
                    data: json,
                    error: message
                };
            }

            return {
                ok: true,
                status: res.status,
                data: json,
                error: null
            };
        } catch (err) {
            return {
                ok: false,
                status: 0,
                data: null,
                error: String(err)
            };
        }
    }, []);

    return callApi;
};
