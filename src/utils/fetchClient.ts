const BASE_URL = 'https://service-api-amiran.azurewebsites.net/api/';

// a promise resolved after a given delay
function wait(delay: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
    url: string,
    method: RequestMethod = 'GET',
    // eslint-disable-next-line
    data: any = null, // we can send any data to the server
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userHeaders: any = null,
): Promise<T> {
    const options: RequestInit = { method };

    if ((method == 'GET' || method == 'DELETE') && data) {
        options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            ...data,
        };
    }

    if (method != 'GET' && method != 'DELETE' && data) {
        // We add body and Content-Type only for the requests with data
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            ...userHeaders,
        };
    }

    // we wait for testing purpose to see loaders
    return wait(300)
        .then(() => fetch(BASE_URL + url, options))
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }
            if (response.status === 204) {
                return null;
            }

            return response.json();
        });
}

export const client = {
    // eslint-disable-next-line
    get: <T>(url: string, userHeaders?: any) =>
        request<T>(url, 'GET', userHeaders),
    // eslint-disable-next-line
    post: <T>(url: string, data: any, userHeaders?: any) =>
        request<T>(url, 'POST', data, userHeaders),
    // eslint-disable-next-line
    patch: <T>(url: string, data: any, userHeaders?: any) => request<T>(url, 'PATCH', data, userHeaders),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete: (url: string, userHeaders?: any) =>
        request(url, 'DELETE', userHeaders),
};
