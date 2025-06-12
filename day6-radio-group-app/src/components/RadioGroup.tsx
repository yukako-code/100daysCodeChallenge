// components/RadioGroup.tsx
import React, { useState } from 'react';
import type { RadioGroupOption } from '../constants/type';


type RadioGroupProps = {
    options: RadioGroupOption[];
};

const RadioGroup: React.FC<RadioGroupProps> = ({ options }) => {
    const [selected, setSelected] = useState<string>(options[0]?.value ?? '');
    const selectedOption = options.find(option => option.value === selected);

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
                <p className="text-blue-500">
                    選択された値: {selectedOption?.label}
                </p>
            </div>
        </div>
    );
};
export default RadioGroup;