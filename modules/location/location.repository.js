const Location = require("./location.model");

const create = async (data) => {
    const newLocation = new Location(data);
    await newLocation.save();
    return newLocation;
};

const findById = async (id) => {
    return await Location.findById(id);
};

const findAll = async () => {
    return await Location.find();
};

const updateById = async (id, data) => {
    return await Location.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
    return await Location.findByIdAndDelete(id);
};

module.exports = { create, findById, findAll, updateById, deleteById };