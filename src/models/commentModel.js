const dbPool = require("../config/connection.js");

// GET DATA
const getCommentModel = () => {
    const SQLQuery = "SELECT * FROM comment";

    return dbPool.execute(SQLQuery);
};

// get Data by id
const getByIdCommentModel = (comment_id) => {
    const SQLQuery = "SELECT * From comment WHERE comment_id=?";
    const values = [comment_id];

    return dbPool.execute(SQLQuery, values);
};

// post Data
const postCommentModel = (body, comment_id, publish_id, profile_id) => {
    const SQLQuery = "INSERT INTO comment (comment_id, publish_id, profile_id, comment_text, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)";
    const dates = new Date();

    // Ensure that the undefined values are replaced with null
    const values = [
        comment_id,
        publish_id || null,
        profile_id || null,
        body.comment_text || null,
        dates,
        dates
    ];

    console.log("Values sent to dbPool.execute:", values);

    return dbPool.execute(SQLQuery, values);
};

const updateCommentModel = (body, comment_id, dates) => {
    const SQLQuery = "UPDATE comment SET comment_text=?, updated_at=? WHERE comment_id=?";
    const values = [
        body.comment_text || null,
        dates,
        comment_id
    ];

    return dbPool.execute(SQLQuery, values);
};

// delete data
const deleteCommentModel = (comment_id) => {
    const SQLQuery = "Delete From comment WHERE comment_id=?";
    const values = [comment_id];

    return dbPool.execute(SQLQuery, values);
};

module.exports = {
    getCommentModel,
    getByIdCommentModel,
    postCommentModel,
    updateCommentModel,
    deleteCommentModel,
};
