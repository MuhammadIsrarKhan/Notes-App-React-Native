import { ID } from "react-native-appwrite";
import databaseService from "./databaseService";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  async getNotes() {
    const response = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return {
        error: response.error,
      };
    }
    return {
      data: response,
    };
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
};

export default noteService;
