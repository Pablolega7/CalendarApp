import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const temEvents =  {
        _id     : new Date().getTime(),
        title   : 'Happy Birthday the Boss',
        notes   : 'Buy him a cake',
        start   : new Date(),
        end     : addHours( new Date(), 2 ),
        bgColor : '#fafafa',
        user    : {
           _id  : '123',
           name : 'Pablo',
        }
};

export const calendarSlice = createSlice({
    name         : 'calendar',
    initialState : {
       events       : [
        temEvents
      ],
       activeEvent : null,
    },
    reducers     : {
        onSetActiveEvent : ( state, { payload } ) => {
            state.activeEvent = payload;
        },
    },
});

export const { onSetActiveEvent } = calendarSlice.actions;