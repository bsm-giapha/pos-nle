export const parseUrl = (str, params) => {
    str = str.replace(/{([^{}]+)}/g, function(keyExpr, key) {
        return params[key] || '';
    });
    return str;
};

export const API_AUTH = {
    LOGIN_USER_LENDER: '/lender/login',
    AUTHORIZE_SESSION_USER_LENDER: 'lender/authorize-session',
    PING_TENANT: 'lender/ping/{lenderID}',
};

// LENDERS RELATIONS
export const API_LENDER = {
    BRANCHES_INDEX: 'lender/branch',
    BRANCHES_DETAIL: 'lender/branch/{id}',
};

// LOAN
export const API_LOAN = {
    LOAN_PIPELINE: 'lender/loan/pipeline',
    LOAN_DETAIL: 'lender/loan/{id}',
};

