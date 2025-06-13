import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

const meta: Meta<typeof Calendar> = {
    component: Calendar,
    title: 'Components/Calendar',
    tags: ['autodocs'],
    args: {
        year: 2025,
        month: 6,
    },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const December: Story = {
    args: {
        year: 2025,
        month: 12,
    },
};

export const LeapYearFebruary: Story = {
    args: {
        year: 2024,
        month: 2,
    },
};
