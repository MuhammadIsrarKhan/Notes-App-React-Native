import { ID } from "react-native-appwrite";
import { account } from "../services/appwrite";

const authService = {
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      console.error("Error during registration:", error.message);
      return {
        error: error.message || "An error occurred during registration.",
      };
    }
  },
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      console.error("Error during login:", error.message);
      return {
        error: error.message || "An error occurred during login.",
      };
    }
  },
  async getUser() {
    try {
      const response = await account.get();
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      return {
        error: error.message || "An error occurred while fetching user data.",
      };
    }
  },
  async logout() {
    try {
      await account.deleteSession("current");
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error.message);
      return {
        error: error.message || "An error occurred during logout.",
      };
    }
  },
};

export default authService;
