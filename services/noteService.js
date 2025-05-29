import { ID, Query } from "react-native-appwrite";
import databaseService from "./databaseService";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  async getNotes(userId) {
    if (!userId) {
      console.error("User ID is required to fetch notes.");
      return {
        data: [],
        error: "User ID is required to fetch notes.",
      };
    }
    try {
      const response = await databaseService.listDocuments(
        dbId,
        colId,
        [Query.equal("user_id", userId)],
        100
      );
      return response;
    } catch (error) {
      console.error("Error fetching notes:", error);
      return {
        data: [],
        error: error.message || "An error occurred while fetching notes.",
      };
    }
  },
  async addNote(note) {
    if (!note) {
      return {
        error: "Text is required to create a note.",
      };
    }
    const data = {
      text: note.text,
      createdAt: new Date().toISOString(),
      user_id: note?.userId,
    };
    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );
    if (response.error) {
      return {
        error: response.error,
      };
    }
    return {
      data: response,
    };
  },
  async updateNote(noteId, data) {
    const response = await databaseService.updateDocument(
      dbId,
      colId,
      noteId,
      data
    );
    if (response.error) {
      return {
        error: response.error,
      };
    }
    return {
      data: response,
    };
  },
  async deleteNote(noteId) {
    if (!noteId) {
      return {
        error: "Note ID is required to delete a note.",
      };
    }
    const response = await databaseService.deleteDocument(dbId, colId, noteId);
    if (response.error) {
      return {
        error: response.error,
      };
    }
    return {
      success: true,
    };
  },
};

export default noteService;
