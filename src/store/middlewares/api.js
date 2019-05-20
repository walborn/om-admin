import { RSAA } from 'redux-api-middleware';


const stringify = params => `?${Object.entries(params).map(([ key, value ]) => (value === null ? key : `${key}=${value}`)).join('&')}`;

export default store => next => (action) => {
    const rsaa = action[RSAA];
    if (rsaa) { // Check if this action is a redux-api-middleware action
        const access_token = localStorage.getItem('access_token');
        rsaa.endpoint = `${process.env.REACT_APP_API}${rsaa.endpoint}`;
        rsaa.headers = { 'Content-Type': 'application/json', ...rsaa.headers };
        if ([ 'DELETE', 'PUT', 'POST' ].includes(rsaa.method)) { rsaa.body = JSON.stringify({ access_token, ...rsaa.body }); }
        if (rsaa.method === 'GET') rsaa.endpoint = `${rsaa.endpoint}${stringify({ access_token, ...(rsaa.options || {}) })}`;
    }

    return next(action);
};
