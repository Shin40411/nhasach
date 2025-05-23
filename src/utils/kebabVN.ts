import { kebabCase } from 'es-toolkit';

export function kebabCaseVietnamese(str: string): string {
    const noAccents = str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');

    return kebabCase(noAccents);
}

export function kebabCaseUnQuoteVn(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]/g, "");
}