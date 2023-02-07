import { useSelector, useDispatch } from 'react-redux';
import { onOpenDateModal } from '../store/ui/uiSlice';
import { onCloseDateModal } from '../store/ui/uiSlice';

export const useUiStore = () => {

    const dispatch            = useDispatch();

    const { isDateModalOpen } = useSelector(( state ) => state.ui);

    const openDateModal       = () => {
        dispatch( onOpenDateModal() );
    };

    const closeDateModal      = () => {
        dispatch( onCloseDateModal() );
    };

    return {
        //Properties//
        isDateModalOpen,
        //Methods//
        openDateModal,
        closeDateModal
    };
};