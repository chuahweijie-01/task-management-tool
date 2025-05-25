'use client';

import Button from '@/app/components/Button';
import getTodayDate from '@/app/utils/getTodaysDate';
import React, { useEffect, useState } from 'react';
import { ITaskData } from '../interfaces/task.interface';
import InputField from '@/app/components/InputField';
import TextField from '@/app/components/TextField';

type Props = {
    isOpen: boolean;
    initialData?: ITaskData;
    submitLabel?: string;
    onSubmit: (task: ITaskData) => void;
    onCancel?: () => void;
};

const MAX_DESCRIPTION_LENGTH = 500;

const TaskForm: React.FC<Props> = ({
    isOpen,
    onSubmit,
    initialData,
    submitLabel,
    onCancel,
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadlineDate, setDeadlineDate] = useState(getTodayDate());
    const [isPriority, setIsPriority] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof ITaskData, string>>>({});

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title);
                setDescription(initialData.description);
                setDeadlineDate(initialData.deadlineDate);
                setIsPriority(initialData.isPriority);
            } else {
                resetForm();
            }
        }
    }, [isOpen, initialData]);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof ITaskData, string>> = {};
        if (!title.trim()) newErrors.title = 'Task title is required.';
        if (description.trim().length >= MAX_DESCRIPTION_LENGTH)
            newErrors.description = `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters.`;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDeadlineDate(getTodayDate());
        setIsPriority(false);
        setErrors({});
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.slice(0, MAX_DESCRIPTION_LENGTH);
        setDescription(value);
        setErrors(prev => ({
            ...prev,
            description: value.length >= MAX_DESCRIPTION_LENGTH
                ? `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters.`
                : undefined
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({ title, description, deadlineDate, isPriority });
        if (!initialData) resetForm();
    };

    return (
        <div className="py-4 px-2 lg:px-6">
            <div className="flex justify-center items-center pb-2">
                <span className="text-3xl font-bold">
                    {initialData ? 'Edit Task' : 'Create New Task'}
                </span>
            </div>
            <form className="flex flex-col gap-4 my-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 pb-8">
                    <InputField
                        label='Task Title'
                        type='text'
                        value={title}
                        placeholder='Task Title'
                        error={errors.title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        label='Task Description'
                        value={description}
                        placeholder='Task Description'
                        onChange={handleDescriptionChange}
                        rows={4}
                        error={errors.description}
                    />
                    <InputField
                        label='Deadline Date'
                        type='date'
                        value={deadlineDate}
                        minDate={getTodayDate()}
                        onChange={e => setDeadlineDate(e.target.value)}
                    />
                    <InputField
                        label='Is this task a priority?'
                        type='checkbox'
                        checked={isPriority}
                        onChange={e => setIsPriority(e.target.checked)}
                    />
                </div>
                <div className="flex gap-3 justify-end flex-col md:flex-row">
                    <Button
                        type='submit'
                        label={submitLabel!}
                        className='bg-black text-white'
                    />
                    {onCancel && (
                        <Button
                            label='Cancel'
                            className='bg-gray-200 text-black'
                            onClick={onCancel}
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;