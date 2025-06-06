import React from 'react'
import type { ButtonProps, ReactionValue } from './ReactionCounter';

interface IProps extends ButtonProps {
    onClickReaction: (name: ReactionValue) => void;
}
const ReactionButton: React.FC<IProps> = ({ name, text, onClickReaction, bgColor, bgHoverColor }) => {
    return (
        <button name={name} onClick={() => onClickReaction(name)} className={`px-4 py-2 ${bgColor} text-white rounded-lg hover:${bgHoverColor} transition`}>
            {text}
        </button>
    )
}
export default ReactionButton;