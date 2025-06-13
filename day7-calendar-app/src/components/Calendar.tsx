import React from 'react';
import useCalendar from '../hooks/useCalendar';
import { weekNames } from '../constants';

const Calendar: React.FC = () => {
    const { year, month, days } = useCalendar();

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-center mb-4">{year}年 {month}月</h2>
            <div className="grid grid-cols-7 gap-2 text-center font-semibold">
                {weekNames.map((day) => (
                    <div key={day} className="text-gray-700">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2">
                {days.map((day, index) => (
                    <div key={index} className={`p-2 rounded-lg ${day === 0 ? 'bg-gray-200' : 'bg-white'} ${day === new Date().getDate() && month === new Date().getMonth() + 1 ? 'border-2 border-blue-500' : ''}`}>
                        {day !== 0 ? day : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
