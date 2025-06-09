'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import TaskSearch from './components/TaskSearch';
import { FilterOption } from './constants/filter-option';
import { createTask, deleteTask, getTasks, updateTask, updateTaskStatus } from './api/task';
import { useToast } from '../hooks/useToast';
import { GetAllTaskResponse } from './interfaces/get-all-task-response';
import { UpdateTaskDto } from './dto/update-task-dto';
import { CreateTaskDto } from './dto/create-task-dto';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const sortTasks = (tasks: GetAllTaskResponse[]) =>
  tasks.slice().sort((a, b) => {
    if (a.isPriority !== b.isPriority) {
      return b.isPriority ? 1 : -1;
    }
    return new Date(b.deadlineDate).getTime() - new Date(a.deadlineDate).getTime();
  });

const TasksPage = () => {
  const [tasks, setTasks] = useState<GetAllTaskResponse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState<GetAllTaskResponse | null>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<FilterOption>('incomplete');
  const { showToast } = useToast();
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token, router])

  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(sortTasks(data));
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, [token]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = search
      ? task.title.toLowerCase().includes(search.toLowerCase())
      : true;

    switch (selected) {
      case 'all':
        return matchesSearch;
      case 'priority':
        return task.isPriority && matchesSearch;
      case 'completed':
        return task.isCompleted && matchesSearch;
      case 'incomplete':
        return !task.isCompleted && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const handleModalClose = useCallback(() => {
    setOpenModal(false);
    setTimeout(() => setEditingTask(null), 300);
  }, []);

  const openCreateModal = useCallback(() => {
    setEditingTask(null);
    setOpenModal(true);
  }, []);

  const openEditModal = useCallback((task: GetAllTaskResponse) => {
    setEditingTask(task);
    setOpenModal(true);
  }, []);

  const handleAddTask = useCallback(async (newTask: CreateTaskDto) => {
    try {
      const data = await createTask(newTask);
      if (!data) return;
      setTasks(sortTasks(data));
      handleModalClose();
      showToast({ type: 'success', description: 'Task added successfully.' });

    } catch (error) {
      console.error('Error:', error);
      showToast({ type: 'error', description: 'An error occurred. Please try again.' });
    }
  }, [handleModalClose, showToast]);

  const handleEditTask = useCallback(async (updatedTask: UpdateTaskDto) => {
    if (!editingTask) return;
    try {
      const data = await updateTask(editingTask.id, updatedTask);
      if (!data) return;
      setTasks(sortTasks(data));
      handleModalClose();
      showToast({ type: 'success', description: 'Task updated successfully.' });

    } catch (error) {
      console.error('Error:', error);
      showToast({ type: 'error', description: 'An error occurred. Please try again.' });
    }
  }, [editingTask, handleModalClose, showToast]);

  const handleDeleteTask = useCallback(async (taskId: string) => {
    try {
      const data = await deleteTask(taskId);
      if (!data) return;
      setTasks(sortTasks(data));
      showToast({ type: 'success', description: 'Task deleted successfully.' });

    } catch (error) {
      console.error('Error:', error);
      showToast({ type: 'error', description: 'An error occurred. Please try again.' });
    }
  }, [showToast]);

  const handleStatusChange = useCallback(async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    try {
      const data = await updateTaskStatus(taskId, updatedTask);
      if (!data) return;
      setTasks(sortTasks(data));
      showToast({ type: 'success', description: 'Task status updated successfully.' });

    } catch (error) {
      console.error('Error:', error);
      showToast({ type: 'error', description: 'An error occurred. Please try again.' });
    }
  }, [tasks, showToast]);

  const handleSubmit = useCallback(async (task: CreateTaskDto | UpdateTaskDto) => {
    if (editingTask) {
      await handleEditTask(task as UpdateTaskDto);
    } else {
      await handleAddTask(task as CreateTaskDto);
    }
  }, [editingTask, handleAddTask, handleEditTask]);

  if (!token) {
    return null;
  }

  return (
    <div className='p-5'>
      <Modal isOpen={openModal} onClose={handleModalClose}>
        <TaskForm
          isOpen={openModal}
          onSubmit={handleSubmit}
          initialData={editingTask || undefined}
          submitLabel={editingTask ? 'Update Task' : 'Create Task'}
          onCancel={handleModalClose}
        />
      </Modal>

      <TaskSearch
        search={search}
        selected={selected}
        onSearchChange={setSearch}
        onRadioChange={setSelected}
      />

      <div className='h-full rounded-2xl p-10 flex flex-col bg-white'>
        <div className='flex justify-between pb-5'>
          <span className='font-bold text-2xl'>My Task Collection</span>
          <Icon icon='plus' className='cursor-pointer' size={30} onClick={openCreateModal} />
        </div>

        <div className='grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] items-stretch'>
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <TaskCard
                  {...task}
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
    </div>
  );
};

export default TasksPage;
