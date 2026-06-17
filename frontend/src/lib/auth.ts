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

export function getCurrentUsuarioNome() {
    return getTokenPayload()?.nome ?? null;
}

export function normalizarTextoExibicao(valor: string | null | undefined) {
    if (!valor) {
        return null;
    }

    if (!/[ÃÂ]/.test(valor)) {
        return valor.normalize("NFC");
    }

    try {
        const bytes = Uint8Array.from(Array.from(valor).map((caractere) => caractere.charCodeAt(0)));
        return new TextDecoder("utf-8").decode(bytes).normalize("NFC");
    } catch {
        return valor.normalize("NFC");
    }
}
