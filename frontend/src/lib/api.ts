export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

type RequestOptions = RequestInit & {
    json?: unknown;
};

export async function apiRequest(path: string, options: RequestOptions = {}) {
    const {json, headers, ...rest} = options;
    const token = localStorage.getItem("ufmsos.token");
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...rest,
        headers: {
            "Content-Type": "application/json",
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...headers,
        },
        body: json === undefined ? rest.body : JSON.stringify(json),
    });

    return response;
}
