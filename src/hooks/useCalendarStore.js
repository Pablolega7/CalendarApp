import { useSelector,useDispatch } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store/calendar/calendarSlice';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const dispatch                = useDispatch();
    const { events, activeEvent } = useSelector( state  => state.calendar );
    const { user }                = useSelector( state  => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    };

    const startSavingEvent = async ( calendarEvent ) => {
        try {
            if (calendarEvent.id) {
                await calendarApi.put( `/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent( { ...calendarEvent , user } ));
                return;
            }
                const { data } = await calendarApi.post( '/events', calendarEvent );
                dispatch( onAddNewEvent( { ...calendarEvent, id: data.id, user }));
        }
        catch (error) {
            Swal.fire( 'Failed to Save', error.response.data.msg, 'error' );
        };
    };

    const stardeletingteEvent = async () => {
        try {
            await calendarApi.delete( `/events/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );
        }
        catch (error) {
            Swal.fire( 'Failed to Delete', error.response.data.msg, 'error' );
        }
    };

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get( '/events' );
            const events = convertEventsToDateEvents( data.events );
            dispatch( onLoadEvents( events ));
        }
        catch (error) {
            console.log(error);
            console.log('Error on charge events');
        }
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
        startLoadingEvents
    };
};