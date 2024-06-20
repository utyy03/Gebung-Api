const {
    getCommentModel,
    getByIdCommentModel,
    postCommentModel,
    updateCommentModel,
    deleteCommentModel
} = require("../models/commentModel.js");

const { nanoid } = require("nanoid");

// get data
const getComment = async (req, res) => {
    try {
        const [data] = await getCommentModel();
        res.json({
            code: 200,
            status: 'OK',
            message: 'success grab data Comment',
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
const getByIdComment = async (req, res) => {
    const { comment_id } = req.params;
    try {
        const [data] = await getByIdCommentModel(comment_id);
        if (data.length === 0) {
            res.status(404).json({
                code: 404,
                status: 'NOT FOUND',
                message: 'Data Comment not found',
                data: null,
            });
        } else {
            res.json({
                code: 200,
                status: 'OK',
                message: 'Success grab data Comment',
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

const { getPublishModel } = require("../models/publishModel.js");
const { getProfileModel } = require("../models/profileModel.js");

const postComment = async (req, res) => {
    const { body } = req;
    const comment_id = nanoid(16);

    try {
        // Fetch the publish_id from the publish table
        const [publishData] = await getPublishModel();
        if (!publishData || publishData.length === 0) {
            throw new Error('No data available for publish_id');
        }

        const publish_id = publishData[0].publish_id;

        // Fetch the profile_id from the profile table
        const [profileData] = await getProfileModel(req.user_id);
        if (!profileData || profileData.length === 0) {
            throw new Error('No data available for profile_id');
        }

        const profile_id = profileData[0].profile_id;

        const [data] = await postCommentModel(body, comment_id, publish_id, profile_id);
        res.status(201).json({
            code: 201,
            status: "CREATED",
            message: 'Comment added successfully',
            data: { comment_id, ...body },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: 'Failed to add Comment: ' + error.message,
        });
    }
};

// update data
const updateComment = async (req, res) => {
    const { comment_id } = req.params;
    const { body } = req;
    const dates = new Date();
    try {
        const [data] = await updateCommentModel(body, comment_id, dates);
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
                message: 'Update Comment is success',
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
const deleteComment = async (req, res) => {
    const { comment_id } = req.params;
    try {
        const [data] = await deleteCommentModel(comment_id);
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
                message: 'success deleted Comment',
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
    getComment,
    getByIdComment,
    postComment,
    updateComment,
    deleteComment
};