import { useSelector,useDispatch } from 'react-redux';
import { onSetActiveEvent, onAddNewEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const dispatch                = useDispatch();

    const { events, activeEvent } = useSelector(( state ) => state.calendar);

    const setActiveEvent          = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    };

    const startSavingEvent        = async ( calendarEvent ) => {

        if (calendarEvent._id) {

        } else {
            dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() }));

        }

    };


    return {

        //Porperties//
        events,
        activeEvent,

        //Methods//
        setActiveEvent,
        startSavingEvent,
    };
};