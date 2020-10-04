// Admin API HTTP set at http://localhost:3000
import api from "../axios/backendAPI";

// Retrieve all admin accounts
const getAllCovidUserAccounts = async () => {
  try {
    let res = await api.get("/users/covid");
    return res;
  } catch (e) {
    console.error(e);
  }
};

// Retrieve admin account with ${adminId}
// const getUserAccount = async (userId) => {
//   try {

//     let res = await api.get("/users/retrieve", {
//       params: {
//         adminId: adminId,
//       },
//     });

//     return res;
//   } catch (e) {
//     console.error(e);
//   }
// };

export default {
    getAllCovidUserAccounts
};
