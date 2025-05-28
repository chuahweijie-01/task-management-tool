type GetRemainingDaysParams = {
    createdDate: string | number | Date;
    deadlineDate: string | number | Date;
};

type RemainingDaysResult = {
    totalDays: number;
    remainingDays: number;
    consumedDay: number;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const getRemainingDays = ({
    createdDate,
    deadlineDate,
}: GetRemainingDaysParams): RemainingDaysResult => {
    const created = new Date(createdDate);
    const deadline = new Date(deadlineDate);
    const now = new Date();

    const totalDays = Math.max(1, Math.ceil((deadline.getTime() - created.getTime()) / MS_PER_DAY) + 1);
    const remainingDays = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / MS_PER_DAY));
    const consumedDay = Math.max(
        0,
        Math.min(totalDays, Math.ceil((now.getTime() - created.getTime()) / MS_PER_DAY) + 1)
    );

    return { totalDays, remainingDays, consumedDay };
};

export default getRemainingDays;