import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TabSwitcher from '../TabSwitcher';

describe('TabSwitcher', () => {
    test('デフォルトで最初のタブがアクティブになっている', () => {
        render(<TabSwitcher />);
        const tab1Button = screen.getByTestId("tab-button-tab1");
        expect(tab1Button).toHaveClass('bg-blue-500');
        expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    });

    test('タブをクリックすると、正しいタブがアクティブになる', () => {
        render(<TabSwitcher />);
        const tab2Button = screen.getByRole('button', { name: 'Tab 2' });
        fireEvent.click(tab2Button);
        expect(tab2Button).toHaveClass('bg-blue-500');
        expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    });

    test('アクティブなタブのスタイルが bg-blue-500 である', () => {
        render(<TabSwitcher />);
        const tab3Button = screen.getByRole('button', { name: 'Tab 3' });
        fireEvent.click(tab3Button);
        expect(tab3Button).toHaveClass('bg-blue-500');
    });

    test('アクティブタブのコンテンツが表示される', () => {
        render(<TabSwitcher />);
        const tab2Button = screen.getByRole('button', { name: 'Tab 2' });
        fireEvent.click(tab2Button);
        expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    });
});
