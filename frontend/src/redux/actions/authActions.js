import {
  SET_EMAIL,
  SET_TOKEN,
  CLEAR_AUTH,
  SET_LOADING,
  USER_DATA,
  NEW_USER,
  GENERATED_QR_IMAGE,
  IS_TOTP_ENABLED,
} from "./actionTypes";

// Action creators
export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setUserData = (userData) => ({
  type: USER_DATA,
  payload: userData,
});

export const setUserQr = (isNewUser) => ({
  type: NEW_USER,
  payload: isNewUser,
});

export const setGeneratedQr = (qrImage) => ({
  type: GENERATED_QR_IMAGE,
  payload: qrImage,
});

export const setTotpEnabled = (isTotpEnabled) => ({
  type: IS_TOTP_ENABLED,
  payload: isTotpEnabled,
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});
