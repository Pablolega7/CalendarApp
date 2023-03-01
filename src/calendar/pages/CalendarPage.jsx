import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessages } from '../../helpers';
import { useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { useEffect } from "react";

export const CalendarPage = () => {

    const { user }                                       = useAuthStore();
    const { openDateModal }                              = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const [ lastView, setLastView ]                      = useState( localStorage.getItem( 'lastView' ) || 'week');

    const eventStyleGetter                               = ( events, start, end, isSelected ) => {
        const isMyEvent = ( user.uid === events.user._id )|| ( user.uid === events.user.uid );
        const style     = {
            backgroundColor : isMyEvent ? 'green' : '#347CF7',
            borderRadius    : '9px',
            opacity         :  0.8,
            color           : 'white',
        };
        return {
            style
        };
    };

    const onDoubleClick = () => {
        openDateModal();
    };

    const onSelect = ( event ) => {
        setActiveEvent( event );
    };

    const onViewChanged = ( event ) => {
        localStorage.setItem( 'lastView', event );
        setLastView( event );
    };

    useEffect(() => { startLoadingEvents() }, []);

    return (
        <>
            <Navbar />
            <Calendar
                localizer          = { localizer }
                events             = { events }
                defaultView        = { lastView }
                startAccessor      = "start"
                endAccessor        = "end"
                style              = {{ height: 'calc( 100vh - 80px )' }}
                messages           = { getMessages() }
                eventPropGetter    = { eventStyleGetter }
                components         = {{
                    event : CalendarEvent
                }}
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent      = { onSelect }
                onView             = { onViewChanged }
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
};