import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSwatchbook, FaSitemap, FaChartBar, FaFish, FaRedo, FaShieldAlt, FaChartLine, FaQuestion, FaCheckSquare } from 'react-icons/fa';
import { GiHistogram } from 'react-icons/gi';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 tracking-wide flex items-center">
        <FaSwatchbook className="mr-2" /> Ferramentas
      </h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaHome className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/swot" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaSwatchbook className="mr-3" /> SWOT
            </Link>
          </li>
          <li>
            <Link to="/histogram" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <GiHistogram className="mr-3" /> Histograma
            </Link>
          </li>
          <li>
            <Link to="/flowchart" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaSitemap className="mr-3" /> Fluxograma
            </Link>
          </li>
          <li>
            <Link to="/abc" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaChartBar className="mr-3" /> Curva ABC
            </Link>
          </li>
          <li>
            <Link to="/ishikawa" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaFish className="mr-3" /> Diagrama de Ishikawa
            </Link>
          </li>
          <li>
            <Link to="/pdca" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaRedo className="mr-3" /> Ciclo PDCA
            </Link>
          </li>
          <li>
            <Link to="/control-charts" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaShieldAlt className="mr-3" /> Cartas de Controle
            </Link>
          </li>
          <li>
            <Link to="/scatter" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaChartLine className="mr-3" /> Diagrama de Dispersão
            </Link>
          </li>
          <li>
            <Link to="/5w2h" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaQuestion className="mr-3" /> 5W2H
            </Link>
          </li>
          <li>
            <Link to="/check-sheets" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200">
              <FaCheckSquare className="mr-3" /> Folhas de Verificação
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;