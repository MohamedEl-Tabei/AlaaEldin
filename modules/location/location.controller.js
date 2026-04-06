const locationRepo = require("./location.repository");

const createLocation = async (req, res) => {
    try {
        const { governorateId, areaId, streetName, apartment, floorNumber, buildingNumber, additionalDetails } = req.body;

        if (!governorateId || !areaId || !streetName || !apartment || !floorNumber || !buildingNumber) {
            return res.status(400).json({ message: "Missing required location fields" });
        }

        const location = await locationRepo.create({
            governorateId,
            areaId,
            streetName,
            apartment,
            floorNumber,
            buildingNumber,
            additionalDetails,
        });

        res.status(201).json({ message: "Location created successfully", location });
    } catch (error) {
        console.error("Location creation error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getLocations = async (req, res) => {
    try {
        const locations = await locationRepo.findAll();
        res.status(200).json({ locations });
    } catch (error) {
        console.error("Fetch locations error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await locationRepo.findById(id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ location });
    } catch (error) {
        console.error("Get location error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const location = await locationRepo.updateById(id, updateData);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: "Location updated successfully", location });
    } catch (error) {
        console.error("Update location error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await locationRepo.deleteById(id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        console.error("Delete location error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createLocation,
    getLocations,
    getLocationById,
    updateLocationById,
    deleteLocationById,
};