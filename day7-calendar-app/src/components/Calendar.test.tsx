import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar', () => {
    test('renders correct year and month', () => {
        render(<Calendar year={2025} month={6} />);
        expect(screen.getByText(/2025年 6月/)).toBeInTheDocument();
    });

    test('renders all 7 weekday labels', () => {
        render(<Calendar year={2025} month={6} />);
        ['日', '月', '火', '水', '木', '金', '土'].forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    test('renders all days in June 2025', () => {
        render(<Calendar year={2025} month={6} />);
        for (let i = 1; i <= 30; i++) {
            expect(screen.getByText(String(i))).toBeInTheDocument();
        }
    });
});
