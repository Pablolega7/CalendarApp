import { useSelector,useDispatch } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const dispatch                = useDispatch();
    const { events, activeEvent } = useSelector( state  => state.calendar );
    const { user }                = useSelector( state  => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    };

    const startSavingEvent = async ( calendarEvent ) => {

        if (calendarEvent._id) {
            dispatch( onUpdateEvent( calendarEvent ));

        } else {
            const { data } = await calendarApi.post( '/events', calendarEvent );
            dispatch( onAddNewEvent( { ...calendarEvent, id: data.id, user }));
        };
    };

    const stardeletingteEvent = () => {
        dispatch( onDeleteEvent() );
    };

    return {

        //Porperties//
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Methods//
        setActiveEvent,
        startSavingEvent,
        stardeletingteEvent,
    };
};