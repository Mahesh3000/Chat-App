import {
  SET_EMAIL,
  SET_TOKEN,
  CLEAR_AUTH,
  SET_LOADING,
  USER_DATA,
  NEW_USER,
  GENERATED_QR_IMAGE,
  IS_TOTP_ENABLED,
} from "../actions/actionTypes";

const initialState = {
  email: null,
  token: null,
  isLoading: false,
  userData: "",
  isNewUser: false,
  qrImage: "",
  isTotpEnabled: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case NEW_USER:
      return {
        ...state,
        isNewUser: action.payload,
      };

    case GENERATED_QR_IMAGE:
      return {
        ...state,
        qrImage: action.payload,
      };

    case IS_TOTP_ENABLED:
      return {
        ...state,
        isTotpEnabled: action.payload,
      };

    case CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
