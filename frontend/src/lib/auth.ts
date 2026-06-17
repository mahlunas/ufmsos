type JwtPayload = {
    id?: string;
    nome?: string;
    sub?: string;
    exp?: number;
    iat?: number;
};

function decodeBase64Url(value: string) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return atob(padded);
}

export function getTokenPayload(): JwtPayload | null {
    const token = localStorage.getItem("ufmsos.token");

    if (!token) {
        return null;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
        return null;
    }

    try {
        return JSON.parse(decodeBase64Url(parts[1])) as JwtPayload;
    } catch {
        return null;
    }
}

export function getCurrentUsuarioId() {
    return getTokenPayload()?.id ?? null;
}

export function getCurrentUsuarioEmail() {
    return getTokenPayload()?.sub ?? null;
}
