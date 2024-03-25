import { useState } from "react";
import "./App.css";
import CardContainer from "./components/CardContainer";
import Header from "./components/Header";
import NotesForm from "./components/NotesForm";
import { NotesProvider } from "./context/NotesProvider";

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [cardId, setCardId] = useState(0);

  const handleClose = () => {
    setFormVisible(false);
  };
  const handleEdit = (id: number) => {
    setCardId(id);
    setFormVisible(true);
  };

  return (
    <div className="page-content container mt-4">
      <NotesProvider>
        <Header
          handleShowAddNotesForm={() => {
            setCardId(0);
            setFormVisible(true);
          }}
        />
        <CardContainer handleEdit={handleEdit} />
        <NotesForm
          show={formVisible}
          handleClose={handleClose}
          noteId={cardId}
        />
      </NotesProvider>
    </div>
  );
}

export default App;
