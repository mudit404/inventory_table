import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {
  return (
    <>
      <div className="header">
        <div className="brand-name">
          <b>INVENTORY</b>
        </div>
      </div>
      <div className="custom-table">
        <Table/>
      </div>

    </>
    
  );
}

export default App;
