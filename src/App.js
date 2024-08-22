import logo from './logo.svg';
import './App.css';

//import React from 'react';
// import PieChart from './components/PieChart';
// import LineChart from './components/LineChart';
// import PieChart from './components/PieChart';
// import LineChart from './components/LineChart';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Cloud Dashboard</h1>
//         <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
//           <div style={{ width: '40%' }}>
//             <h2>CSPM Cloud Accounts</h2>
//             <PieChart />
//           </div>
//           <div style={{ width: '40%' }}>
//             <h2>Cloud Risk Assessment</h2>
//             <LineChart />
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import Dashboard from './Dashboard';


// function App() {
//   return (
//     <div className="App">
//       <h1>Cloud Dashboard</h1>
//       <PieChart />
//       <LineChart />
//     </div>
//   );
// }
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>My Dashboard</h1>
        <p>Visualizing CSPM cloud accounts and risk assessments.</p>
        <div className="chart-container">
          <PieChart />
        </div>
        <div className="chart-container-small">
          <LineChart />
        </div>
        <button>View More Details</button>
      </header> */}
       <Dashboard />
    </div>
  );
}
export default App;
