const {
    getPublishModel,
    getByIdPublishModel,
    postPublishModel,
    updatePublishModel,
    deletePublishModel
} = require("../models/publishModel.js");
const { nanoid } = require("nanoid");

const { getProfileModel } = require("../models/profileModel.js"); // Import getProfileModel function

// get data
const getPublish = async (req, res) => {
    try {
        const [data] = await getPublishModel();
        res.json({
            code: 200,
            status: 'OK',
            message: 'Success grab data Publish',
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
const getByIdPublish = async (req, res) => {
    const { publish_id } = req.params;
    try {
        const [data] = await getByIdPublishModel(publish_id);
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
                message: 'Success grab data Publish',
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
const postPublish = async (req, res) => {
    const { body } = req;
    const publish_id = nanoid(16);

    try {
        // Fetch the user_id and profile_id from the profile table based on your logic
        const [profileData] = await getProfileModel(req.user_id); // Modify this line according to your logic
        const profile_id = profileData[0].profile_id;

        const [data] = await postPublishModel(body, publish_id, new Date(), profile_id);
        if (data.affectedRows > 0) {
            res.status(201).json({
                code: 201,
                status: "CREATED",
                message: 'Publish added successfully',
                data: { publish_id, ...body },
            });
        } else {
            res.status(500).json({
                code: 500,
                status: 'INTERNAL SERVER ERROR',
                message: 'Failed to add Publish',
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
const updatePublish = async (req, res) => {
    const { publish_id } = req.params;
    const { body } = req;
    const dates = new Date();
    try {
        const [data] = await updatePublishModel(body, publish_id, dates);
        if (data.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
            });
        } else {
            res.json({
                code: 200,
                status: "OK",
                message: 'Update Publish is success',
                data: req.body,
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
        });
    }
};

// deleted
const deletePublish = async (req, res) => {
    const { publish_id } = req.params;
    try {
        const [data] = await deletePublishModel(publish_id);
        if (data.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data not found',
            });
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success deleted Publish',
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error,
        });
    }
};

module.exports = {
    getPublish,
    getByIdPublish,
    postPublish,
    updatePublish,
    deletePublish
};
