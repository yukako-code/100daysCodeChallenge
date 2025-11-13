import React from 'react';
import cn from 'classnames';

export type ButtonProps = {
    title: string
    type?: 'default' | 'danger'
}

export const Button: React.FC<ButtonProps> = ({ title, type = 'default' }) => {
    const className = cn('px-2 py-1 rounded-md border', {
        ['border-red-100 bg-red-50 text-red-600']: type === 'danger',
        ['border-slate-200 bg-slate-50']: type !== 'danger'
    })
    return (
        <button className={className}>
            {title}
        </button>
    )
}