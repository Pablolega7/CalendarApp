import { addHours, differenceInSeconds } from "date-fns";
import { useMemo, useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import  'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from "../../hooks";

const customStyles = {
    content: {
        top        : "50%",
        left       : "50%",
        right      : "auto",
        bottom     : "auto",
        transform  : "translate(-50%, -50%)",
        background : "antiquewhite",
    },
};

Modal.setAppElement( "#root" );

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal }   = useUiStore();
    const [ formSubmnitted, setFormSubmnitted ] = useState( false );
    const { activeEvent }                       = useCalendarStore();

    const [ formValues, setFormValues ] = useState( {
        title   : 'Title',
        notes   : 'Notes',
        start   : new Date(),
        end     : addHours( new Date(), 2 ),
    });

    const titleClass = useMemo( () => {
        if ( !formSubmnitted ) return '';

        return formValues.title.length > 0 ? '' : 'is-invalid';

    }, [ formValues.title, formSubmnitted ]);

    useEffect( () => {
        if ( activeEvent !== null ) {
            setFormValues( { ...activeEvent } );
        }
    }, [ activeEvent ]);

    const onInputChange = ( { target } ) => {
        setFormValues( {
            ...formValues,
            [ target.name ] : target.value,
        });
    };

    const onDateChange = ( event, changing ) => {
        setFormValues( {
            ...formValues,
            [ changing ] : event,
        });
    };

    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmnitted( true );

        const diffence = differenceInSeconds( formValues.end, formValues.start );

        if ( isNaN( diffence ) || diffence <= 0 ) {
             Swal.fire( 'Incorrect Dates', 'Checked the Dates Entered', 'error' );
             return;
        };

        if ( formValues.title.length < 2 ) return;

        console.log( formValues );
    };

    return (
        <Modal
            isOpen           = { isDateModalOpen }
            onRequestClose   = { onCloseModal }
            style            = { customStyles }
            className        = "modal"
            overlayClassName = "modal-fondo"
            closeTimeoutMS   = { 200 }
        >
            <h1> New Event </h1>
            <hr />
            <form className="container" onSubmit = { onSubmit }>

                <div className="form-group mb-2">
                    <label>Start Date and Time</label>
                    <DatePicker
                        selected   = { formValues.start }
                        onChange   = { ( event ) => onDateChange( event, 'start' ) }
                        className  = "form-control"
                        dateFormat = "Pp"
                        showTimeSelect
                    />
                </div>

                <div className="form-group mb-2">
                    <label>End Date and Time</label>
                    <DatePicker
                        minDate    = { formValues.start }
                        selected   = { formValues.end }
                        onChange   = { ( event ) => onDateChange( event, 'end' ) }
                        className  = "form-control"
                        dateFormat = "Pp"
                        showTimeSelect
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and Notes</label>
                    <input
                        type         = "text"
                        className    =  { `form-control ${ titleClass }` }
                        placeholder  = "Event Title"
                        name         = "title"
                        autoComplete = "off"
                        value        = { formValues.title }
                        onChange     = { onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Short description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type        = "text"
                        className   = "form-control"
                        placeholder = "Notes"
                        rows        = "5"
                        name        = "notes"
                        value       = { formValues.notes }
                        onChange    = { onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional Information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    &nbsp;
                    <span>Save</span>
                </button>

            </form>
        </Modal>
    );
};
