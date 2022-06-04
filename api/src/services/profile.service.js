const profileDao = require('../dao/profile.dao');
const profileResponse = require('../entity/profile.response').profileResponse;

const fetchProfile = async(phoneNumber) => {
    const fetchProfileResponse = await profileDao.fetchProfile(phoneNumber);
    return setResponse(fetchProfileResponse);
};

const saveProfile = async(userInfo) => {
    const saveProfileStatus = await profileDao.saveProfile(userInfo);
    return setResponse(saveProfileStatus);
};

const updateProfile = async(userInfo) => {
    const profileProfileStatus = await profileDao.updateProfile(userInfo);
    return setResponse(profileProfileStatus);
};

const setResponse = (profileStatus) => {
    switch (profileStatus[0]) {
        case 2000:
            profileResponse.status = 201;
            profileResponse.code = profileStatus[0];
            profileResponse.data = profileStatus[1];
            profileResponse.message = 'PROFILE_SAVE_SUCCESS';
            break;
        case -2000:
            profileResponse.status = 500;
            profileResponse.code = profileStatus[0];
            profileResponse.data = undefined;
            profileResponse.message = 'PROFILE_SAVE_FAILURE';
            break;
        case 2001:
            profileResponse.status = 202;
            profileResponse.code = profileStatus[0];
            profileResponse.data = profileStatus[1];
            profileResponse.message = 'PROFILE_UPDATE_SUCCESS';
            break;
        case -2001:
            profileResponse.status = 500;
            profileResponse.code = profileStatus[0];
            profileResponse.data = undefined;
            profileResponse.message = 'PROFILE_UPDATE_FAILURE';
            break;
        case 2010:
            profileResponse.status = 200;
            profileResponse.code = profileStatus[0];
            profileResponse.data = profileStatus[1];
            profileResponse.message = 'PROFILE_FETCH_SUCCESS';
            break;
        case -2010:
            profileResponse.status = 404;
            profileResponse.code = profileStatus[0];
            profileResponse.data = undefined;
            profileResponse.message = 'PROFILE_NOT_FOUND';
            break;
        default:
            profileResponse.status = 500;
            profileResponse.code = profileStatus[0];
            profileResponse.data = undefined;
            profileResponse.message = 'INTERNAL_SERVER_ERROR';
            break;
    }
    return profileResponse;
};

module.exports = {
    fetchProfile,
    saveProfile,
    updateProfile,
};