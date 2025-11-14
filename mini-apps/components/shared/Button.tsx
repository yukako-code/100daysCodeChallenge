import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string
    variant?: 'default' | 'danger'
}

export const Button: React.FC<Props> = ({ title, variant = 'default', ...others }) => {
    const className = cn('px-2 py-1 rounded-md border', {
        ['border-red-100 bg-red-50 text-red-600']: variant === 'danger',
        ['border-slate-200 bg-slate-50']: variant !== 'danger'
    })
    return (
        <button className={className} {...others}>
            {title}
        </button>
    )
}