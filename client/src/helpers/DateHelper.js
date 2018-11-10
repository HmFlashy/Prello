import moment from "moment";

export const GetDueDateColor = (date, isCompleted) => {
    if (isCompleted) {
        return "green"
    }
    const diff = moment(date).diff(moment(), "hours");
    if (diff < 24 && diff >= 0) {
        return "orange"
    }
    else if (diff < 0) {
        return "red"
    }
};

export const SmallDate = (date) => {
    return moment(date).format("MMM D")
};

export const getDueDateMode = (date, isCompleted, dueDateMode) => {
    switch (dueDateMode) {
        case "DUE_THIS_DAY":
            if (!date) return false;
            else if (isCompleted) return false;
            else {
                const diff = moment(date).diff(moment(), "seconds");
                if (diff < 0) return false;
                else return moment(date).diff(moment().endOf("day"), "minutes") <= 0
            }
        case "DUE_NEXT_DAY":
            if (!date) return false;
            else if (isCompleted) return false;
            else {
                const diff = moment(date).diff(moment(), "minutes");
                console.log(diff)
                return (diff <= 60 * 24 && diff >= 0)
            }
        case "DUE_NEXT_WEEK":
            if (!date) return false;
            else if (isCompleted) return false;
            else {
                const diff = moment(date).diff(moment(), "minutes");
                return (diff <= 60 * 24 * 7 && diff >= 0)
            }
        case "DUE_NEXT_MONTH":
            if (isCompleted) return false;
            else if (!date) return false;
            else {
                const diff = moment(date).diff(moment(), "minutes");
                return (diff <= 60 * 24 * 7 * 4 && diff >= 0)
            }
        case "NO_DUE_DATE":
            return !date;
        case "DUE_DATE_MARKED_COMPLETED":
            if (!date) return false;
            else return isCompleted;
        case "DUE_DATE_NOT_MARKED_COMPLETED":
            if (!date) return false;
            else return date !== null && !isCompleted;
        case "OVERDUE":
            if (!date) return false;
            else if (isCompleted) return false;
            else {
                const diff = moment(date).diff(moment(), "seconds");
                return (diff <= 0)
            }
    }
};