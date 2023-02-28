import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

// const tempEvents =  {
//         _id     : new Date().getTime(),
//         title   : 'Happy Birthday the Boss',
//         notes   : 'Buy him a cake',
//         start   : new Date(),
//         end     : addHours( new Date(), 2 ),
//         bgColor : '#fafafa',
//         user    : {
//            _id  : '123',
//            name : 'Pablo',
//         }
// };

export const calendarSlice = createSlice({
    name         : 'calendar',
    initialState : {
        isLoadingEvents : true,
       events          : [
        // tempEvents
      ],
       activeEvent     : null,
    },
    reducers     : {
        onSetActiveEvent : ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent    : ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent    : ( state, { payload } ) => {
            state.events = state.events.map( ( e ) => ( e.id === payload.id ? payload : e ) );
        },
        onDeleteEvent    : ( state ) => {
            if (state.activeEvent) {
                state.events      = state.events.filter( ( e ) => e.id !== state.activeEvent.id );
                state.activeEvent = null;
            };
        },
        onLoadEvents     : ( state, { payload = [] } ) => {
            // state.events         = payload;
            state.isLoadingEvents = false;
            payload.forEach( ( event ) => {
                const exists = state.events.some( ( e ) => e.id === event.id );
                if ( !exists ) {
                    state.events.push( event );
                }
            });
        },
    },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;