const dbPool = require("../config/connection.js");

// GET DATA
const getPublishModel = () => {
    const SQLQuery = "SELECT * FROM publish";

    return dbPool.execute(SQLQuery);
};

// get Data by id
const getByIdPublishModel = (publish_id) => {
    const SQLQuery = "SELECT * FROM publish WHERE publish_id=?";
    const values = [publish_id];

    return dbPool.execute(SQLQuery, values);
};

// post Data
// post Data
const postPublishModel = async (body, publish_id, dates, profile_id) => {
    const SQLQuery =
        "INSERT INTO publish (publish_id, profile_id, image_publish, price, supply, grade, description, address, distance_from_user, likes, comments, views, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
        publish_id,
        profile_id,
        body.image_publish || null,
        body.price || null,
        body.supply || null,
        body.grade || null,
        body.description || null,
        body.address || null,
        body.distance_from_user || null,
        body.likes || null,
        body.comments || null,
        body.views || null,
        dates,
        dates
    ];

    console.log("Values sent to dbPool.execute:", values);

    return dbPool.execute(SQLQuery, values);
};


// UPDATE DATA
const updatePublishModel = (body, publish_id, dates) => {
    const SQLQuery =
        "UPDATE publish SET image_publish=?, price=?, supply=?, grade=?, description=?, address=?, distance_from_user=?, likes=?, comments=?, views=?, updated_at=? WHERE publish_id=?";

    const values = [
        body.image_publish || null,
        body.price || null,
        body.supply || null,
        body.grade || null,
        body.description || null,
        body.address || null,
        body.distance_from_user || null,
        body.likes || null,
        body.comments || null,
        body.views || null,
        dates,
        publish_id
    ];

    return dbPool.execute(SQLQuery, values);
};

// delete data
const deletePublishModel = (publish_id) => {
    const SQLQuery = "DELETE FROM publish WHERE publish_id=?";
    const values = [publish_id];

    return dbPool.execute(SQLQuery, values);
};

module.exports = {
    getPublishModel,
    getByIdPublishModel,
    postPublishModel,
    updatePublishModel,
    deletePublishModel
};
