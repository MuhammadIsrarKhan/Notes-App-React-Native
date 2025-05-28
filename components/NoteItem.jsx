import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteItem = ({ item, onDelete }) => {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item.text}</Text>
      <TouchableOpacity onPress={() => onDelete(item?.$id)}>
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
  },
  delete: {
    fontSize: 18,
    color: "red",
  },
  actions: {
    flexDirection: "row",
  },
  edit: {
    fontSize: 18,
    marginRight: 10,
    color: "blue",
  },
});

export default NoteItem;
