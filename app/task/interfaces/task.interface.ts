export type ITask = ITaskData & {
    id: string;
    isCompleted: boolean;
    createdDate: string;
};

export type ITaskData = {
    title: string;
    description: string;
    deadlineDate: string;
    isPriority: boolean;
};