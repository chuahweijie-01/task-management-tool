import React from 'react';
import TaskSearchRadio from './TaskSearchRadio';
import { FilterOption } from '../constants/filter-option';

type TaskSearchProps = {
    search: string;
    selected: FilterOption;
    onSearchChange: (search: string) => void;
    onRadioChange: (option: FilterOption) => void;
};

const TaskSearch: React.FC<TaskSearchProps> = ({
    search,
    selected,
    onSearchChange,
    onRadioChange,
}) => (
    <div className='h-full rounded-2xl p-10 flex flex-col bg-white mb-6'>
        <span className='font-bold text-2xl'>Task Search</span>
        <input
            type='text'
            placeholder='Search for tasks...'
            className='border rounded-lg p-2 border-gray-300 w-full mt-4'
            value={search}
            onChange={e => onSearchChange(e.target.value)}
        />
        <TaskSearchRadio selected={selected} onChange={onRadioChange} />
    </div>
);

export default TaskSearch;