const getCookie = function(cookieName) {
    const cookie = document.cookie.split('; ')
        .find(row => row.startsWith(`${cookieName}=`));
    return cookie ? cookie.split('=')[1] : '';
};

const setCookie = function(key, value, maxAgeInSeconds = 3600) {
    document.cookie = `${key}=${value}; path=/; max-age=${maxAgeInSeconds}`;
};

export {
    getCookie,
    setCookie,
};
