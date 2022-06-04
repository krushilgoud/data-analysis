const response = require('../modals/response.modal').response;

const setSuccessResponse = (data) => {
    response.status = 200;
    response.data = data;
    response.message = 'SUCCESS';
    return response;
};

const setErrorResponse = (data) => {
    response.status = 500;
    response.data = data;
    response.message = 'INTERNAL SERVER ERROR';
    return response;
};

module.exports = { setSuccessResponse, setErrorResponse };