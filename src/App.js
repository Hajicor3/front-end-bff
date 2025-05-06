import './App.css'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Produtos from './components/pages/Produtos';
import Fornecedores from './components/pages/Fornecedores';
import Fornecedor from './components/pages/Fornecedor';
import NovoFornecedor from './components/pages/NovoFornecedor';
import Produto from './components/pages/Produto';

function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/produtos' element={<Produtos />} />
            <Route path='/fornecedores' element={<Fornecedores />} />
            <Route path='/fornecedor/:id' element={<Fornecedor />} />
            <Route path='/novofornecedor' element={<NovoFornecedor />} />
            <Route path='/produto/:id' element={<Produto />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
