import { FlatList } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item?.$id}
      renderItem={({ item }) => <NoteItem item={item} />}
    />
  );
};

export default NoteList;