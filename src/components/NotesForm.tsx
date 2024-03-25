import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { NoteTypesEnum } from "../types";
import { CardData, useNotesProvider } from "../context/NotesProvider";

function NotesForm({
  show,
  handleClose,
  noteId,
}: {
  show: boolean;
  handleClose: () => void;
  noteId: number;
}) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: NoteTypesEnum.ninguna,
    date: new Date(),
  });
  const { AddOrUpdateNote, CardData } = useNotesProvider();

  const onFieldValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dateFromDateString = (dateString: Date) => {
    return new Date(dateString).toISOString();
  };

  const handleAddOrUpdateNote = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setValidated(true);

    const newNote: CardData = {
      id: noteId,
      date: new Date(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      isFavorite: false,
    };

    AddOrUpdateNote(newNote);

    //Limpiar controles
    setFormData({
      title: "",
      description: "",
      category: NoteTypesEnum.ninguna,
      date: new Date(),
    });
    handleClose();
  };

  //Obtener la nota para editar
  useEffect(() => {
    if (noteId === 0) {
      //Limpiar controles
      setFormData({
        title: "",
        description: "",
        category: NoteTypesEnum.ninguna,
        date: new Date(),
      });
    } else {
      const cardToEdit = CardData?.find((card) => card.id === noteId);
      if (cardToEdit) setFormData({ ...cardToEdit });
    }
  }, [noteId, CardData]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form noValidate validated={validated} onSubmit={handleAddOrUpdateNote}>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            Nueva nota
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="noteTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título de la nota"
              required
              name="title"
              value={formData.title}
              onChange={onFieldValueChanged}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="noteDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción de la nota"
              name="description"
              value={formData.description}
              onChange={onFieldValueChanged}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="noteType">
            <Form.Label>Categoría</Form.Label>
            <div key={"inline-radio"} className="mb-3">
              <Form.Check
                inline
                label="Ninguna"
                name="category"
                type="radio"
                id="categoryNone"
                value="ninguna"
                checked={formData.category === NoteTypesEnum.ninguna}
                onChange={onFieldValueChanged}
              />
              <Form.Check
                inline
                label="Personal"
                name="category"
                type="radio"
                id="categoryPersonal"
                value="personal"
                checked={formData.category === NoteTypesEnum.personal}
                onChange={onFieldValueChanged}
              />
              <Form.Check
                inline
                label="Trabajo"
                name="category"
                type="radio"
                id="categoryTrabajo"
                value="trabajo"
                onChange={onFieldValueChanged}
                checked={formData.category === NoteTypesEnum.trabajo}
              />
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Aceptar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default NotesForm;
