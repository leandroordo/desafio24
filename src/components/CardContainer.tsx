import { Container, Row } from "react-bootstrap";
import NoteCard from "./NoteCard";
import { useNotesProvider } from "../context/NotesProvider";

function CardContainer({ handleEdit }: { handleEdit: (id: number) => void }) {
  const { CardData } = useNotesProvider();

  return (
    <Container className="bg-transparent p-4">
      <Row>
        {CardData?.map((card) => {
          return (
            <NoteCard
              id={card.id}
              title={card.title}
              subtitle={card.date.toLocaleDateString()}
              text={card.description}
              type={card.category}
              favorite={card.isFavorite}
              key={card.id}
              handleEdit={() => {
                handleEdit(card.id);
              }}
            />
          );
        })}
      </Row>
    </Container>
  );
}

export default CardContainer;
