import React, { useEffect, useRef, useState } from 'react';

const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        // クリーンアップ（コンポーネントがアンマウントされたら停止）
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const handleReset = () => {
        setSeconds(0);
        setIsRunning(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 font-mono px-4">
            <h1 className="text-5xl mb-6">{seconds}s</h1>
            <div className="flex space-x-4">
                <button
                    className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                    onClick={() => setIsRunning(true)}
                >
                    Start
                </button>
                <button
                    className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                    onClick={() => setIsRunning(false)}
                >
                    Stop
                </button>
                <button
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
