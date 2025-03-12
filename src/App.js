import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const App = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), " ", _jsx("main", { className: "flex-1 p-6", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/swot", element: _jsx(Swot, {}) }), _jsx(Route, { path: "/histogram", element: _jsx(Histogram, {}) }), _jsx(Route, { path: "/flowchart", element: _jsx(Flowchart, {}) }), _jsx(Route, { path: "/abc", element: _jsx(Abc, {}) }), _jsx(Route, { path: "/ishikawa", element: _jsx(Ishikawa, {}) }), _jsx(Route, { path: "/pdca", element: _jsx(Pdca, {}) }), _jsx(Route, { path: "/control-charts", element: _jsx(ControlCharts, {}) }), _jsx(Route, { path: "/scatter", element: _jsx(Scatter, {}) }), _jsx(Route, { path: "/5w2h", element: _jsx(FiveW2H, {}) }), _jsx(Route, { path: "/check-sheets", element: _jsx(CheckSheets, {}) }), _jsx(Route, { path: "*", element: _jsx("h1", { children: "P\u00E1gina N\u00E3o Encontrada" }) })] }) })] }) }));
};
export default App;
