import React from 'react';
import { FilterOption } from '../constants/filter-option';

type TaskSearchRadioProps = {
    selected: FilterOption;
    onChange: (option: FilterOption) => void;
    className?: string;
};

const options: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'Show All' },
    { value: 'priority', label: 'Show only priority tasks' },
    { value: 'completed', label: 'Show only completed tasks' },
    { value: 'incomplete', label: 'Show only incompleted tasks' },
];

const TaskSearchRadio: React.FC<TaskSearchRadioProps> = ({ selected, onChange, className = '' }) => (
    <div className={`flex gap-6 mt-4 ${className} flex-col md:flex-row`}>
        {options.map(opt => (
            <div className="flex gap-2 items-center" key={opt.value}>
                <input
                    id={`search-${opt.value}-radio`}
                    type="radio"
                    className="accent-green-700 border-gray-300 w-5 h-5"
                    checked={selected === opt.value}
                    onChange={() => onChange(opt.value)}
                />
                <label htmlFor={`search-${opt.value}-radio`} className="text-sm">
                    {opt.label}
                </label>
            </div>
        ))}
    </div>
);

export default TaskSearchRadio;