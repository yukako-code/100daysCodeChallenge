// 'use client';
import { Habit } from "@/type";

const mockHabits: Array<Habit> = [
    {
        id: '1',
        name: '朝10分ストレッチ',
        completed: false,
    },
    {
        id: '2',
        name: '日記を書く',
        completed: true,
    },
    {
        id: '3',
        name: '水を2リットル飲む',
        completed: false,
    },
];

export const loadFromStorage = (): Array<Habit> => {
    if (typeof window === 'undefined') return []; //ブラウザのAPI（localStorage） なので、サーバー側では存在しません（= undefined）
    const localHabit = localStorage.getItem('habits');
    return localHabit ? JSON.parse(localHabit) : mockHabits
}

export const saveToStorage = (habits: Array<Habit>) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('habits', JSON.stringify(habits))
}