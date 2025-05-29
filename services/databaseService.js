import { database } from "./appwrite";

const databaseService = {
  async listDocuments(dbId, colId, queries = []) {
    try {
      const response = await database.listDocuments(dbId, colId, queries);
      return { data: response.documents || [], error: null };
    } catch (error) {
      console.error("Error fetching documents:", error.message);
      return {
        error: error.message || "An error occurred while fetching documents.",
      };
    }
  },
  async createDocument(dbId, colId, data, id = null) {
    try {
      const response = await database.createDocument(dbId, colId, id, data);
      return response;
    } catch (error) {
      console.error("Error creating document:", error.message);
      return {
        error:
          error.message || "An error occurred while creating the document.",
      };
    }
  },
  async updateDocument(dbId, colId, docId, data) {
    try {
      const response = await database.updateDocument(dbId, colId, docId, data);
      return response;
    } catch (error) {
      console.error("Error updating document:", error.message);
      return {
        error:
          error.message || "An error occurred while updating the document.",
      };
    }
  },
  async deleteDocument(dbId, colId, docId) {
    try {
      await database.deleteDocument(dbId, colId, docId);
      return { success: true };
    } catch (error) {
      console.error("Error deleting document:", error.message);
      return {
        error:
          error.message || "An error occurred while deleting the document.",
      };
    }
  },
};

export default databaseService;
