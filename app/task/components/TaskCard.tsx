'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/app/components/Button';
import Icon from '@/app/components/Icon';
import ProgressBar from '@/app/components/ProgressBar';
import getRemainingDays from '@/app/utils/getRemainingDays';

type TaskCardProps = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isPriority: boolean;
  createdDate: string;
  deadlineDate: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  isCompleted,
  isPriority,
  createdDate,
  deadlineDate,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [complete, setComplete] = useState(isCompleted);
  const { totalDays, consumedDay } = getRemainingDays({ createdDate, deadlineDate });

  const handleToggleComplete = () => {
    const newStatus = !complete;
    setComplete(newStatus);
    onStatusChange();
  };
  
  const progressPercent = totalDays > 0 ? Math.round((consumedDay / totalDays) * 100) : 0;

  return (
    <motion.div
      whileHover={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
      className={`
        bg-white p-5 flex flex-col gap-8 border rounded-xl h-full
        ${isPriority ? 'border-orange-400 border-2' : 'border-gray-200'}
      `}
    >
      <div className="flex-grow">
        <h1 className="font-bold text-base">{title}</h1>
        <p className="text-xs break-words overflow-hidden">{description}</p>
      </div>

      <div className="text-xs">
        <div className="pb-4 flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <Icon icon="clock" className="text-green-600" />
            <p>{createdDate}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Icon icon="clock" className="text-red-600" />
            <p>{deadlineDate}</p>
          </div>
        </div>

        <div className="pb-2">
          <ProgressBar percentage={progressPercent} isCompleted={complete} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Icon icon="edit-2" className="text-green-600" onClick={onEdit} />
            <Icon icon="trash-2" className="text-red-600" onClick={onDelete} />
          </div>
          <div>
            <Button
              onClick={handleToggleComplete}
              className={`${complete ? 'bg-green-200' : 'bg-orange-200'}`}
              padding='px-3 py-1'
              label={complete ? 'Done' : 'Mark As Done'}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;