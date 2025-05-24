'use client';

import Button from '@/app/components/Button';
import getTodayDate from '@/app/utils/getTodaysDate';
import React, { useEffect, useState } from 'react';
import { ITaskData } from '../interfaces/task.interface';

type Props = {
    isOpen: boolean;
    initialData?: ITaskData;
    submitLabel?: string;
    onSubmit: (task: ITaskData) => void;
    onCancel?: () => void;
};

const MAX_DESCRIPTION_LENGTH = 500;

const CreateTask: React.FC<Props> = ({
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
        if (description.trim().length > MAX_DESCRIPTION_LENGTH)
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

    const inputStyle = (error?: string) =>
        `border rounded-lg p-2 ${error ? 'border-red-500' : 'border-gray-300'}`;
    const labelStyle = (error?: string) =>
        `text-sm font-semibold ${error ? 'text-red-500' : ''}`;

    return (
        <div className="py-4 px-6">
            <div className="flex justify-center items-center pb-2">
                <span className="text-3xl font-bold">
                    {initialData ? 'Edit Task' : 'Create New Task'}
                </span>
            </div>
            <form className="flex flex-col gap-4 my-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 pb-8">
                    <div className="flex gap-2 flex-col">
                        <label className={labelStyle(errors.title)}>Task Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Task Title"
                            className={inputStyle(errors.title)}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <label className={labelStyle(errors.description)}>Task Description</label>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Task Description"
                            rows={4}
                            className={`${inputStyle(errors.description)} min-h-40 max-h-40 resize-none`}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <label className="text-sm font-semibold">Deadline Date</label>
                        <input
                            type="date"
                            min={getTodayDate()}
                            value={deadlineDate}
                            onChange={e => setDeadlineDate(e.target.value)}
                            onKeyDown={e => e.preventDefault()}
                            className="border rounded-lg p-2 border-gray-300 cursor-pointer"
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <input
                            id="priority-checkbox"
                            type="checkbox"
                            checked={isPriority}
                            onChange={e => setIsPriority(e.target.checked)}
                            className="accent-green-700 border-gray-300 w-4 h-4"
                        />
                        <label htmlFor="priority-checkbox" className="text-sm">Is this task a priority?</label>
                    </div>
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

export default CreateTask;