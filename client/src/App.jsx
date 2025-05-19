import Container from 'react-bootstrap/Container';
import { TodoListCard } from './components/TodoListCard';
import { Greeting } from './components/Greeting';
import { ThemeToggle } from './components/ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <>
      <ThemeToggle />
      <Container className="app-container">
        <div className="app-header">
          <Greeting />
          <div className="app-logo">
            <FontAwesomeIcon icon={faCheckCircle} size="lg" className="me-2" />
            <span className="fw-bold">TaskMaster</span>
          </div>
        </div>
        <div className="todo-card scale-in">
          <TodoListCard />
        </div>
        <footer className="text-center mt-4 footer-text">
          <small>Made with <span className="heart">❤️</span> using React & Docker</small>
        </footer>
      </Container>
    </>
  );
}

export default App;