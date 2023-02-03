import { Navbar, CalendarEvent } from "../";
import { Calendar } from 'react-big-calendar'
import { addHours } from "date-fns";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessages } from '../../helpers';

const events = [{
    title   : 'Happy Birthday the Boss',
    notes   : 'Buy him a cake',
    start   : new Date(),
    end     : addHours( new Date(), 2 ),
    bgColor : '#fafafa',
    user    : {
       _id  : '123',
       name : 'Pablo',
    }
}];

export const CalendarPage = () => {

    const eventStyleGetter = ( events, start, end, isSelected ) => {

        const style = {
            backgroundColor : '#367CF7',
            borderRadius    : '0px',
            opacity         : 0.8,
            color           : 'white',
        };

        return {
            style
        };
    };

    return (
        <>
            <Navbar />
            <Calendar
                localizer       = { localizer }
                events          = { events }
                startAccessor   = "start"
                endAccessor     = "end"
                style           = {{ height: 'calc( 100vh - 80px )' }}
                messages        = { getMessages() }
                eventPropGetter = { eventStyleGetter }
                components      = {{
                    event : CalendarEvent
                }}
            />
        </>
    )
};