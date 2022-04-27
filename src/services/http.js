import { redirect } from './redirect.js';
import { request } from './request.js';

export const http =
{
    get: (url, method = 'GET') =>
        request(url, method)
            .then((response) =>
            {
                return response;
            })
            .catch((error) =>
            {
                redirect.signInPage(error.response.status);

                return error.response;
            }),

    post: (url, data, method = 'POST') =>
        request(url, method, data)
            .then((response) =>
            {
                return response;
            })
            .catch((error) =>
            {
                redirect.signInPage(error.response.status);

                return error.response;
            }),

    put: (url, data, method = 'PUT') =>
        request(url, method, data)
            .then((response) =>
            {
                return response;
            })
            .catch((error) =>
            {
                redirect.signInPage(error.response.status);

                return error.response;
            }),

    delete: (url, method = 'DELETE') =>
        request(url, method)
            .then((response) =>
            {
                return response;
            })
            .catch((error) =>
            {
                redirect.signInPage(error.response.status);

                return error.response;
            }),

    download: (url, method = 'GET') =>
        downloadFile(url, method)
            .then((response) =>
            {
                return response
            })
            .catch((error) =>
            {
                redirect.signInPage(error.response.status);

                return error.response;
            }),

    patch: (url, method = 'PATCH') =>
        request(url, method)
            .then((response) =>
            {
                return response;
            })
            .catch((error) =>
            {
                redirect.signInPage(error.response.status);

                return error.response;
            })
};
