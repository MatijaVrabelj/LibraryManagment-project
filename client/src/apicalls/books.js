import { axiosInstance } from "./axiosInstance";

//ADD BOOK
export const AddBook = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/books/add-book", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//GET ALL BOOKS
export const GetAllBooks = async () => {
  try {
    const response = await axiosInstance.get("/api/books/get-all-books");
    return response.data;
  } catch (error) {
    throw error;
  }
};

//UPDATE BOOK
export const UpdateBook = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/books/update-book/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//DELETE BOOK
export const DeleteBook = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/books/delete-book/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get book by ID 
export const GetBookById = async(id) => {
  try {
    const response = await axiosInstance.get(`/api/books/get-book-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}