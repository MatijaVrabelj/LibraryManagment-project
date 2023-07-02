import { axiosInstance } from "./axiosInstance";


//integracija API call-ova - povalći sve USERE s servera na client
//register user
export const RegisterUser = async (payload) => {

    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;

    } catch (error) {
        throw error;
    }
};

//login user
export const LoginUser = async (payload) => {

    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;

    } catch (error) {
        throw error;
    }
};

//get user details
export const getLoggedInUserDetails = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-logged-in-user");
        return response.data;
    } catch (error) {
        throw error;
    }
}

//get all users
export const GetAllUsers = async (role) => {
    try {
        const response = await axiosInstance.get(`/api/users/get-all-users/${role}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//get user by ID
export const GetUserById = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/users/get-user-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }