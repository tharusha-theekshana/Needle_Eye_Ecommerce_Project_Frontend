import { APP_CONFIG } from '../config/app.config';

const BASE_URL = APP_CONFIG.apiBaseUrl;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    OTP_VERIFICATION: `${BASE_URL}/auth/otp-verification`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
  },

  USER: {
    GET_BY_ID: (userId: string) => `${BASE_URL}/user/${userId}`,
  },


  PRODUCT: {
    LIST: `${BASE_URL}/product`,
    DETAIL: (id: string) => `${BASE_URL}/product/${id}`,
  },

  CART: {
    GET: `${BASE_URL}/cart`,
    ADD_ITEM: `${BASE_URL}/cart/item`,
  },

  ORDER: {
    CREATE: `${BASE_URL}/order`,
    LIST: `${BASE_URL}/order`,
  },
};
