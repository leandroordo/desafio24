import './App.css';
import CardContainer from './components/CardContainer';
import Header from './components/Header';
import NotesForm from './components/NotesForm';

function App() {
  return (
    <div className='page-content container mt-4'>
      <Header />
      <CardContainer />
      <NotesForm />
    </div>
  );
}

export default App;
