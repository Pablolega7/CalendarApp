import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { onChecking } from "../store/auth/authSlice";
import { onLogin } from "../store/auth/authSlice";
import { onLogout } from "../store/auth/authSlice";
import { clearErrorMessage } from "../store/auth/authSlice";

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector(( state ) => state.auth);
  const dispatch                       = useDispatch();

  const startLogin = async ({ email, password }) => {

    dispatch( onChecking());
    try {

      const { data } = await calendarApi.post("/auth", { email, password });

      localStorage.setItem( "token", data.token );
      localStorage.setItem( "token-init-date", new Date().getTime() );

      dispatch( onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
        dispatch( onLogout( 'Incorrect Credentials' ));
        setTimeout(() => {
            dispatch( clearErrorMessage() );
        }, 10 );
    };
  };

  return {
    //Properties
    status,
    user,
    errorMessage,
    //Methods
    startLogin,
  };
};
