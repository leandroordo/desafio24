import { Button, Card, Col, ToggleButton } from "react-bootstrap";
import { MdDeleteOutline, MdFavoriteBorder } from "react-icons/md";
import { useState } from "react";
import { CardTypes } from "../types";

export default function NoteCard({
  title,
  subtitle,
  text,
  type,
}: {
  title: string;
  subtitle: string;
  text: string;
  type: CardTypes;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <Col md={3} sm={6}>
      <Card
        border={type === CardTypes.personal ? "danger" : "info"}
        style={{ width: "18rem" }}
        className="col-md-4"
      >
        <Card.Body>
          <Card.Title className="text-truncate">{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Card.Text>{text}</Card.Text>
          <ToggleButton
            className="mb-2"
            id="toggle-favorite"
            type="checkbox"
            variant="outline-warning"
            checked={checked}
            value="1"
            onChange={(e) => setChecked(e.currentTarget.checked)}
          >
            <MdFavoriteBorder />
          </ToggleButton>
          <Button variant="outline-danger" className="mb-2">
            <MdDeleteOutline />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
