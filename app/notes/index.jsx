import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";
import noteService from "../../services/noteService";

const NotesScreen = () => {
  const router = useRouter();
  const { user, loading: AuthLoading } = useAuth();

  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!AuthLoading && !user) {
      router.replace("/auth");
    }
  }, [user, AuthLoading]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes(user?.$id);
    setLoading(false);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes(response.data || []);
    }
  };
  const addNote = async () => {
    if (newNote.trim() === "") {
      alert("Please enter a note");
      return;
    }
    setLoading(true);
    const response = await noteService.addNote({
      userId: user?.$id,
      text: newNote,
    });
    setLoading(false);
    if (response.error) {
      Alert.alert("Error", response.error);
      return;
    } else {
      setNotes((prevNotes) => [...prevNotes, response.data]);
    }
    setNewNote("");
    setModalVisible(false);
  };
  const deleteNote = async (noteId) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          const response = await noteService.deleteNote(noteId);
          setLoading(false);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            setNotes((prevNotes) =>
              prevNotes.filter((note) => note.$id !== noteId)
            );
          }
        },
      },
    ]);
  };
  const editNote = async (noteId, newText) => {
    if (newText.trim() === "") {
      Alert.alert("Error", "Note text cannot be empty.");
      return;
    }
    setLoading(true);
    const response = await noteService.updateNote(noteId, { text: newText });
    setLoading(false);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === noteId ? { ...note, text: newText } : note
        )
      );
    }
  };
  return (
    <View style={styles.container}>
      {notes.length === 0 ? (
        <Text style={styles.noNotesText}>You have no notes</Text>
      ) : (
        <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>{" "}
      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
});

export default NotesScreen;
