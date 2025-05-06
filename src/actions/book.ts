import { useMemo } from "react";
import DanhSachSGK from '../_mock/_map/DanhSachSGK.json';
import { IBookItem, IBookFilters } from 'src/types/book';
import { allComponents } from "src/sections/nhasach/layout";
import { kebabCaseVietnamese } from "src/utils/kebabVN";

function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(16);
}

function slugify(str: string): string {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-');
}

function unslugifySubject(slug: string): string {
    const found = BOOKS.find((book) => slugify(book.subject) === slug);
    return found?.subject || '';
}

export const BOOKS: IBookItem[] = DanhSachSGK.map((book, index) => ({
    id: `${simpleHash(book['Tên sách'])}`,
    title: book['Tên sách'],
    subject: book['Môn học'],
    grade: book['Lớp'],
    author: book['Tác giả']
}));

export function useGetBook(bookId: string) {
    const memoizedValue = useMemo(() => {
        const book: IBookItem | undefined = BOOKS.find((b) => b.id === bookId);

        return {
            book,
            bookLoading: false,
            bookError: !book ? new Error('Book not found') : null,
            bookValidating: false,
        };
    }, [bookId]);

    return memoizedValue;
}

export function useGetBooks(filters?: IBookFilters) {
    const filteredBooks = useMemo(() => {
        if (!filters) return BOOKS;

        return BOOKS.filter((book) => {
            const matchSubject = filters.subject
                ? book.subject === unslugifySubject(filters.subject)
                : true;

            const matchGrade = filters.grade
                ? book.grade === `Lớp ${filters.grade}`
                : true;

            const matchAuthor = filters.author
                ? book.author === filters.author
                : true;

            return matchSubject && matchGrade && matchAuthor;
        });
    }, [filters]);

    return filteredBooks;
}