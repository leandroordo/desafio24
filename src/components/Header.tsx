import { useState } from "react";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

function Header({
  handleShowAddNotesForm,
}: {
  handleShowAddNotesForm: () => void;
}) {
  const [active, setActive] = useState("todas");

  return (
    <Nav
      variant="pills"
      defaultActiveKey="todas"
      activeKey={active}
      onSelect={(selectedKey) => setActive(selectedKey || "todas")}
      className="py-2 px-4 bg-white mb-3 align-items-center"
    >
      <Nav.Item>
        <Nav.Link
          eventKey="todas"
          className="rounded-pill d-flex align-items-center px-2 px-md-4 me-0 me-md-3 d-none d-sm-block"
        >
          Todas
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="personal"
          className="rounded-pill d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 d-none d-sm-block"
        >
          Personal
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="trabajo"
          className="rounded-pill d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 d-none d-sm-block"
        >
          Trabajo
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="favoritas"
          className="rounded-pill d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 d-none d-sm-block"
        >
          Favoritas
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="ms-sm-auto">
        <Nav.Link className="rounded-pill d-flex align-items-center px-3">
          <Button
            variant="primary"
            className="btn-primary"
            onClick={handleShowAddNotesForm}
          >
            Agregar notas
          </Button>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
