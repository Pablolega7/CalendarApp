import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name         : 'calendar',
    initialState : {
        isLoadingEvents : true,
       events          : [
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
            state.isLoadingEvents = false;
            payload.forEach( ( event ) => {
                const exists = state.events.some( ( e ) => e.id === event.id );
                if ( !exists ) {
                    state.events.push( event );
                }
            });
        },

        onLogoutCalendar  : ( state ) => {
            state.isLoadingEvents = true;
            state.events          = [];
            state.activeEvent     = null;
        },
    },
});

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar
} = calendarSlice.actions;