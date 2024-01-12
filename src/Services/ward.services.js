const Ward = require("../Models/Ward");
const District = require("../Models/District");

const createWard = (newWard) => {
    return new Promise(async (resolve, reject) => {
        const { wardId, wardName, districtRefId } = newWard;
        try {
            const checkWardById = await Ward.findOne({
                wardId: wardId,
                districtRefId: districtRefId,
            });
            const checkWardByName = await Ward.findOne({
                wardName: wardName,
                districtRefId: districtRefId,
            });
            if (checkWardById === null && checkWardByName === null) {
                const newWard = await Ward.create({
                    wardId,
                    wardName,
                    districtRefId,
                });
                if (newWard) {
                    resolve({
                        status: "OK",
                        message: "SUCCESS",
                        data: newWard,
                    });
                }
            } else {
                resolve({
                    status: "ERR",
                    message: "The Ward is already",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getWardName = (wardId, districtRefId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkWard = await Ward.findOne({
                wardId: wardId,
                districtRefId: districtRefId,
            });
            if (checkWard == null) {
                reject({
                    status: "ERR",
                    message: "The Ward not found",
                });
            } else {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: checkWard.wardName,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const updateWard = (wardId, wardName, districtRefId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(wardId);
            console.log(wardName);
            console.log(districtRefId);
            const checkWard = await Ward.findOne({
                wardName: wardName,
                districtRefId: districtRefId
            });
            console.log(checkWard);
            if (checkWard) {
                resolve({
                    status: "ERR",
                    message: "The Ward Name is already"
                });
            }
            const updatedWard = await Ward.findOneAndUpdate(
                { wardId: wardId, districtRefId: districtRefId },
                { wardName: wardName },
                { new: true }
            );
            resolve({
                status: 'OK',
                message: 'Update Ward success',
                data: updatedWard
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteWard = (wardId, districtRefId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Ward.findOneAndDelete({
                wardId: wardId,
                districtRefId: districtRefId
            });
            resolve({
                status: 'OK',
                message: 'Delete Ward success',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllWard = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allWard = await Ward.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allWard

            })
        } catch (e) {
            reject(e)
        }
    })
}

const getWardsByDistrictId = (districtId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const district = await District.findOne({ disId: districtId });
            if (!district) {
                reject('District not found');
            }

            const wards = await Ward.find({ districtRefId: district.disId });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: wards
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createWard,
    getWardName,
    updateWard,
    deleteWard,
    getAllWard,
    getWardsByDistrictId
};
