const {
    getProfileModel,
    getByIdProfileModel,
    postProfileModel,
    updateProfileModel,
    deleteProfileModel
} = require("../models/profileModel.js");
const { nanoid } = require("nanoid");

// get data
const getProfile = async (req, res) => {
    try {
        const [data] = await getProfileModel();
        res.json({
            code: 200,
            status: 'OK',
            message: 'success grab data Profile',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        });
    }
};

// get by id
const getByIdProfile = async (req, res) => {
    const { profile_id } = req.params;
    try {
        const [data] = await getByIdProfileModel(profile_id);
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
                data: null,
            });
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success grab data Profile',
                data: data,
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
            data: null,
        });
    }
};

// post
const postProfile = async (req, res) => {
    const { body } = req;
    const profile_id = nanoid(16);

    // Mengasumsikan Anda memiliki middleware atau logika untuk mengekstrak user_id dari token
    const user_id = req.user_id; // Sesuaikan ini berdasarkan logika autentikasi Anda

    try {
        const [data] = await postProfileModel(body, profile_id, new Date(), user_id);
        if (data.affectedRows > 0) {
            res.status(201).json({
                code: 201,
                status: "CREATED",
                message: 'Profile added successfully',
                data: { profile_id, ...body },
            });
        } else {
            res.status(500).json({
                code: 500,
                status: 'INTERNAL SERVER ERROR',
                message: 'Failed to add Profile',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error.message,
        });
    }
};

// update data
const updateProfile = async (req, res) => {
    const { profile_id } = req.params;
    const { body } = req;
    const dates = new Date();

    try {
        const [data] = await updateProfileModel(body, profile_id, dates);
        if (data.affectedRows > 0) {
            res.json({
                code: 200,
                status: "OK",
                message: 'Profile updated successfully',
                data: { profile_id, ...body },
            });
        } else {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error.message,
        });
    }
};


// deleted
const deleteProfile = async (req, res) => {
    const { profile_id } = req.params;
    try {
        const [data] = await deleteProfileModel(profile_id);
        if (data.affectedRows > 0) {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Profile deleted successfully',
            });
        } else {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error.message,
        });
    }
};


module.exports = {
    getProfile,
    getByIdProfile,
    postProfile,
    updateProfile,
    deleteProfile
};