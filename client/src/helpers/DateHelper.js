import moment from 'moment';


export const GetDueDateColor = (date, isCompleted) => {
    if (isCompleted) {
        return 'green'
    }
    const diff = moment(date).diff(moment(), 'hours')
    if (diff < 24 && diff >= 0) {
        return 'orange'
    }
    else if (diff < 0) {
        return 'red'
    }
}

export const SmallDate = (date) => {
    return moment(date).format("MMM D")
}