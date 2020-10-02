// Admin API HTTP set at http://localhost:3000
import api from "../axios/backendAPI";

// Retrieve all admin accounts
const getAllAdminAccounts = async () => {
  try {
    let res = await api.get("/admins/retrieve-all");
    return res;
  } catch (e) {
    console.error(e);
  }
};

// Retrieve admin account with ${adminId}
const getAdminAccount = async (adminId) => {
  try {
    let res = await api.get("/admins/retrieve", {
      params: {
        adminId: adminId,
      },
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};

// Create admin account
const createAdminAccount = async (data) => {
  try {
    let res = await api.post("/admins/register", {
      params: {
        name: data.adminId,
        email: data.email,
        password: data.password,
        adminType: data.adminType,
      },
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};

// Update admin account
const updateAdminAccount = async (adminId, data) => {
  try {
    let res = await api.post("/admins/update-admin", {
      body: {
        adminId: adminId,
        name: data.adminId,
        email: data.email,
        adminType: data.adminType,
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

// Unused for now
const deleteAdminAccount = async (adminid) => {
  try {
    // OR
    // return await api.delete("/admins/"${adminId});
    let res = await api.delete("/admins/", {
      params: {
        adminId: adminId,
      },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

export default {
  getAllAdminAccounts,
  getAdminAccount,
  createAdminAccount,
  updateAdminAccount,
  deleteAdminAccount,
};
