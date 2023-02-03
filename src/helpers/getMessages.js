
export const getMessages = () => {
    return {
        allDay          : 'All day',
        previous        : '<',
        next            : '>',
        today           : 'Today',
        month           : 'Month',
        week            : 'Week',
        day             : 'Day',
        agenda          : 'Schedule',
        date            : 'Date',
        time            : 'Hour',
        event           : 'Event',
        noEventsInRange : 'No Events in this Range',
        showMore        : total => `+ See More ( ${ total } )`
    };
};