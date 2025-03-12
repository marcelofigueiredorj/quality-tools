import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/tools/Dashboard';
import Swot from './components/tools/SwotAnalysis';
import Histogram from './components/tools/Histogram';
import Flowchart from './components/tools/Flowchart';
import Abc from './components/tools/AbcCurve';
import Ishikawa from './components/tools/IshikawaDiagram';
import Pdca from './components/tools/PdcaCycle';
import ControlCharts from './components/tools/ControlCharts';
import Scatter from './components/tools/ScatterDiagram';
import FiveW2H from './components/tools/FiveWTwoH';
import CheckSheets from './components/tools/CheckSheets';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar /> {/* Deve aparecer apenas aqui */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/swot" element={<Swot />} />
            <Route path="/histogram" element={<Histogram />} />
            <Route path="/flowchart" element={<Flowchart />} />
            <Route path="/abc" element={<Abc />} />
            <Route path="/ishikawa" element={<Ishikawa />} />
            <Route path="/pdca" element={<Pdca />} />
            <Route path="/control-charts" element={<ControlCharts />} />
            <Route path="/scatter" element={<Scatter />} />
            <Route path="/5w2h" element={<FiveW2H />} />
            <Route path="/check-sheets" element={<CheckSheets />} />
            <Route path="*" element={<h1>Página Não Encontrada</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;