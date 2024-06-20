const dbPool = require("../config/connection.js");

// GET DATA
const getProfileModel = () => {
    const SQLQuery = "SELECT * FROM profile";

    return dbPool.execute(SQLQuery);
};

// get Data by id
const getByIdProfileModel = (profile_id) => {
    const SQLQuery = "SELECT * FROM profile WHERE profile_id=?";
    const values = [profile_id];

    return dbPool.execute(SQLQuery, values);
};

// post Data
const postProfileModel = async (body, profile_id, dates, user_id) => {
    // Anda asumsikan bahwa user_id diperoleh dari token autentikasi
    // Pastikan user_id dikirimkan ke fungsi ini dari logika autentikasi Anda

    const SQLQuery =
        "INSERT INTO profile (profile_id, user_id, image_profile, fullname, role, address, birth, gender, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
        profile_id,
        user_id,
        body.image_profile || null,
        body.fullname || null,
        body.role || 'buyer',
        body.address || null,
        body.birth || null,
        body.gender || null,
        dates,
        dates
    ];

    console.log("Nilai yang dikirimkan ke dbPool.execute:", values);

    return dbPool.execute(SQLQuery, values);
};


const updateProfileModel = async (body, profile_id, dates) => {
    console.log("Values before handling undefined:", body);

    const SQLQuery =
        "UPDATE profile SET image_profile=?, fullname=?, role=?, address=?, birth=?, gender=?, updated_at=? WHERE profile_id=?";

    // Pastikan properti yang mungkin undefined digantikan dengan null
    const values = [
        body.image_profile !== undefined ? body.image_profile : null,
        body.fullname !== undefined ? body.fullname : null,
        body.role !== undefined ? body.role : 'buyer',
        body.address !== undefined ? body.address : null,
        body.birth !== undefined ? body.birth : null,
        body.gender !== undefined ? body.gender : null,
        dates, // updated_at
        profile_id
    ];

    console.log("Values being passed to dbPool.execute:", values);

    return dbPool.execute(SQLQuery, values);
};


// delete data
const deleteProfileModel = (profile_id) => {
    const SQLQuery = "DELETE FROM profile WHERE profile_id=?";
    const values = [profile_id];

    return dbPool.execute(SQLQuery, values);
};

module.exports = {
    getProfileModel,
    getByIdProfileModel,
    postProfileModel,
    updateProfileModel,
    deleteProfileModel,
};