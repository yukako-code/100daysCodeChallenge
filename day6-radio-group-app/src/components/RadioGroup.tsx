// components/RadioGroup.tsx
import React, { useState } from 'react';
import type { RadioGroupOption } from '../constants/type';


type IRadioGroupProps = {
    options: RadioGroupOption[];
};

const RadioGroup: React.FC<IRadioGroupProps> = ({ options }) => {
    const [selected, setSelected] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value);
    };

    return (
        <div className="p-4">
            <div className="space-y-2">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="radio-group"
                            value={option.value}
                            onChange={handleChange}
                            checked={selected === option.value}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
            <div className="mt-4">
                {options.find(option => option.value === selected) && (
                    <p className="text-blue-500">
                        選択された値: {selected}
                    </p>
                )}
            </div>
        </div>
    );
};
export default RadioGroup;