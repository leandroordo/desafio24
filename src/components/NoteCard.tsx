import { Button, Card, Col, ToggleButton } from "react-bootstrap";
import { MdDeleteOutline, MdFavoriteBorder } from "react-icons/md";
import { useState } from "react";
import { NoteTypesEnum } from "../types";
import { useNotesProvider } from "../context/NotesProvider";

export default function NoteCard({
  id,
  title,
  subtitle,
  text,
  type,
  favorite,
  handleEdit,
}: {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  type: NoteTypesEnum;
  favorite: boolean;
  handleEdit: () => void;
}) {
  const [checked, setChecked] = useState(false);
  const { DeleteNote } = useNotesProvider();

  const typeClass =
    type === NoteTypesEnum.personal
      ? "note-personal"
      : type === NoteTypesEnum.trabajo
      ? "note-trabajo"
      : "note-none";

  return (
    <Col className="col-md-4 col-sm-6">
      <Card className="px-4 mb-4">
        <Card.Body>
          <span className={"side-stick " + typeClass}></span>
          <Card.Title
            className="text-truncate"
            role="button"
            onClick={handleEdit}
          >
            {title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Card.Text>{text}</Card.Text>
          <div className="mb-2">
            <ToggleButton
              className="me-2"
              id={"toggle-favorite" + id}
              type="checkbox"
              variant="outline-warning"
              checked={checked}
              value={favorite ? 1 : 0}
              onChange={(e) => setChecked(e.currentTarget.checked)}
            >
              <MdFavoriteBorder />
            </ToggleButton>
            <Button
              variant="outline-danger"
              className="ms-2"
              onClick={() => DeleteNote(id)}
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
