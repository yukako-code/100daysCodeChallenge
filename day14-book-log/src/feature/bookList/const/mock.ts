import { BookReadStatusType, type Book } from "../types";


export const mockBookList: Book[] = [
    {
        id: '1',
        title: '君たちはどう生きるか',
        author: '吉野源三郎',
        status: BookReadStatusType.UNREAD
    },
    {
        id: '2',
        title: '1Q84',
        author: '村上春樹',
        status: BookReadStatusType.READING
    },
    {
        id: '3',
        title: 'コンビニ人間',
        author: '村田沙耶香',
        status: BookReadStatusType.FINISHED
    },
    {
        id: '4',
        title: '嫌われる勇気',
        author: '岸見一郎',
        status: BookReadStatusType.READING
    },
    {
        id: '5',
        title: 'ノルウェイの森',
        author: '村上春樹',
        status: BookReadStatusType.UNREAD
    },
    {
        id: '6',
        title: 'ハリーポッターと賢者の石',
        author: 'J.K.ローリング',
        status: BookReadStatusType.FINISHED
    },
    {
        id: '7',
        title: 'ザ・ゴール',
        author: 'エリヤフ・ゴールドラット',
        status: BookReadStatusType.READING
    },
    {
        id: '8',
        title: 'FACTFULNESS',
        author: 'ハンス・ロスリング',
        status: BookReadStatusType.UNREAD
    },
    {
        id: '9',
        title: 'アンドロイドは電気羊の夢を見るか？',
        author: 'フィリップ・K・ディック',
        status: BookReadStatusType.FINISHED
    },
    {
        id: '10',
        title: '人間失格',
        author: '太宰治',
        status: BookReadStatusType.UNREAD
    },
];
