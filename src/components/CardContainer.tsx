import { Container, Row } from "react-bootstrap";
import { CardTypes } from "../types";
import NoteCard from "./NoteCard";

function CardContainer() {
  return (
    <Container className="bg-transparent row">
      <Row>
        <NoteCard
          title="Card number 1"
          subtitle="20/03/2024"
          text="Esto es una prueba"
          type={CardTypes.personal}
          key={1}
        />
        <NoteCard
          title="Card number 2"
          subtitle="20/03/2024"
          text="Esto es una prueba xx"
          type={CardTypes.trabajo}
          key={2}
        />
        <NoteCard
          title="Card number 3"
          subtitle="20/03/2024"
          text="Esto es una prueba xxx"
          type={CardTypes.trabajo}
          key={3}
        />
        <NoteCard
          title="Card number 4"
          subtitle="20/03/2024"
          text="Esto es una prueba xxxx"
          type={CardTypes.personal}
          key={4}
        />
      </Row>
    </Container>
  );
}

export default CardContainer;
