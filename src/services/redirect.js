import router from '../router/index.js';

export const redirect =
{
    signInPage: (status) =>
    {
        if (status === 401)
        {
            localStorage.removeItem('token');

            router.push('/login');
        }
    },
};
