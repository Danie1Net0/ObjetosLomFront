import { NbAuthJWTToken, NbPasswordAuthStrategy } from '@nebular/auth';

import { environment } from '../environments/environment';

export const AUTH_STRATEGY = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      token: {
        class: NbAuthJWTToken,
        key: 'data.token'
      },
      baseEndpoint: `${ environment.BASE_URL }`,
      login: {
        endpoint: '/auth/login',
        method: 'post',
        redirect: {
          success: '/dashboard',
          failure: null,
        },
      },
      logout: {
        endpoint: '/auth/logout',
        method: 'get'
      },
      requestPass: {
        endpoint: '/auth/forgot-password',
        method: 'post',
        redirect: null
      },
      resetPass: {
        endpoint: '/auth/reset-password',
        method: 'put',
        redirect: {
          success: '/dashboard',
          failure: null,
        }
      },
    }),
  ],
  forms: {
    login: {
      redirectDelay: 0,
      showMessages: {
        success: false,
      },
    },
    resetPass: {
      redirectDelay: 1000,
    },
    validation: {
      password: {
        required: true,
        minLength: 8,
        maxLength: 20,
      },
    },
  },
};

