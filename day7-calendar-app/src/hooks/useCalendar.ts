
type HooksReturnType = {
    year: number;
    month: number;
    days: Array<number | null>;
}
const useCalendar = (year: number, month: number): HooksReturnType => {
    const daysInMonth = new Date(year, month, 0).getDate(); // 月の末日を取得
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 月の初日の曜日を取得
    const spaceBeforeFirstDay = Array.from({ length: firstDayOfMonth }, () => null); // 月の初日までの空白を生成
    const days: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1); // 1日から末日までの配列を生成

    return {
        year,
        month,
        days: [...spaceBeforeFirstDay, ...days] // 初日の前の空白と日付を結合
    }

}

export default useCalendar;
