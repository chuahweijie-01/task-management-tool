'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import getTodayDate from '../utils/getTodaysDate';
import TaskCard from './components/TaskCard';
import CreateTask from './components/TaskForm';
import TaskSearch from './components/TaskSearch';
import { FilterOption } from './constants/filter-option';
import { ITask, ITaskData } from './interfaces/task.interface';
import mockTasks from '../assets/mock/task.json';

const TasksPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [editingTask, setEditingTask] = useState<ITask | null>(null);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<FilterOption>('incomplete');

    useEffect(() => {
        setTasks(sortTasks(mockTasks));
    }, []);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = search
            ? task.title.toLowerCase().includes(search.toLowerCase())
            : true;

        if (selected === 'all') return matchesSearch;
        if (selected === 'priority') return task.isPriority && matchesSearch;
        if (selected === 'completed') return task.isCompleted && matchesSearch;
        if (selected === 'incomplete') return !task.isCompleted && matchesSearch;
        return matchesSearch;
    });

    const sortTasks = (tasks: ITask[]) =>
        tasks.slice().sort((a, b) => {
            if (a.isPriority !== b.isPriority) {
                return b.isPriority ? 1 : -1;
            }
            const dateA = new Date(a.deadlineDate);
            const dateB = new Date(b.deadlineDate);
            return dateB.getTime() - dateA.getTime();
        });

    const openCreateModal = () => {
        setEditingTask(null);
        setOpenModal(true);
    };

    const openEditModal = (task: ITask) => {
        setEditingTask(task);
        setOpenModal(true);
    };

    const handleAddTask = (newTask: ITaskData) => {
        setTasks(prev =>
            sortTasks([
                ...prev,
                {
                    id: Date.now().toString(),
                    ...newTask,
                    isCompleted: false,
                    createdDate: getTodayDate(),
                }
            ])
        );
        setOpenModal(false);
    };

    const handleEditTask = (updatedTask: ITaskData) => {
        setTasks(prev =>
            sortTasks(
                prev.map(task =>
                    task.id === editingTask?.id
                        ? { ...task, ...updatedTask }
                        : task
                )
            )
        );
        handleModalClose();
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setTimeout(() => setEditingTask(null), 300);
    };

    const handleStatusChange = (taskId: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const handleSearchChange = (value: string) => setSearch(value);
    const handleRadioChange = (option: FilterOption) => setSelected(option);

    return (
        <div className='p-5'>
            <Modal isOpen={openModal} onClose={handleModalClose}>
                <CreateTask
                    isOpen={openModal}
                    onSubmit={editingTask ? handleEditTask : handleAddTask}
                    initialData={editingTask || undefined}
                    submitLabel={editingTask ? 'Update Task' : 'Create Task'}
                    onCancel={handleModalClose}
                />
            </Modal>
            <TaskSearch
                search={search}
                selected={selected}
                onSearchChange={handleSearchChange}
                onRadioChange={handleRadioChange}
            />
            <div className='h-full rounded-2xl p-10 flex flex-col bg-white'>
                <div className='flex justify-between pb-5'>
                    <span className='font-bold text-2xl'>My Task Collection</span>
                    <Icon icon='plus' className='cursor-pointer' size={30} onClick={openCreateModal} />
                </div>
                <div className='grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] items-stretch'>
                    <AnimatePresence>
                        {filteredTasks.map(task => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <TaskCard
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    isCompleted={task.isCompleted}
                                    isPriority={task.isPriority}
                                    createdDate={task.createdDate}
                                    deadlineDate={task.deadlineDate}
                                    onEdit={() => openEditModal(task)}
                                    onDelete={() => handleDeleteTask(task.id)}
                                    onStatusChange={() => handleStatusChange(task.id)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <motion.div
                        whileHover={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
                        className='min-h-[208px] flex justify-center items-center cursor-pointer bg-gray-50 border rounded-2xl border-dashed'
                        onClick={openCreateModal}
                    >
                        <Icon icon='plus' size={20} hoverScale={1} /> Create New Task
                    </motion.div>
                </div>
            </div>
        </div >
    )
}

export default TasksPage