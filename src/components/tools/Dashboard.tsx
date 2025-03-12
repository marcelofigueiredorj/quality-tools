import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <p className="text-gray-600 mb-8">
          Bem-vindo ao sistema de Ferramentas de Qualidade. Escolha uma ferramenta abaixo para começar:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card para Análise SWOT */}
          <Link
            to="/swot"
            className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">Análise SWOT</h3>
            <p className="text-gray-600">
              Identifique forças, fraquezas, oportunidades e ameaças para tomar decisões estratégicas.
            </p>
          </Link>

          {/* Card para Histograma */}
          <Link
            to="/histogram"
            className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-green-800 mb-2">Histograma</h3>
            <p className="text-gray-600">
              Visualize a distribuição de dados e identifique padrões ou tendências.
            </p>
          </Link>

          {/* Card para Fluxograma */}
          <Link
            to="/flowchart"
            className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-purple-800 mb-2">Fluxograma</h3>
            <p className="text-gray-600">
              Crie diagramas de fluxo para mapear processos e identificar melhorias.
            </p>
          </Link>

          {/* Card para Curva ABC */}
          <Link
            to="/abc"
            className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Curva ABC</h3>
            <p className="text-gray-600">
              Classifique itens por importância e priorize ações com base no impacto.
            </p>
          </Link>

          {/* Card para Diagrama de Ishikawa */}
          <Link
            to="/ishikawa"
            className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-pink-800 mb-2">Diagrama de Ishikawa</h3>
            <p className="text-gray-600">
              Analise causas raízes de problemas com o método de espinha de peixe.
            </p>
          </Link>

          {/* Card para Ciclo PDCA */}
          <Link
            to="/pdca"
            className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-indigo-800 mb-2">Ciclo PDCA</h3>
            <p className="text-gray-600">
              Planeje, execute, verifique e aja para melhorar processos de forma contínua.
            </p>
          </Link>

          {/* Card para Cartas de Controle */}
          <Link
            to="/control-charts"
            className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-red-800 mb-2">Cartas de Controle</h3>
            <p className="text-gray-600">
              Monitore processos e identifique variações fora do controle.
            </p>
          </Link>

          {/* Card para Diagrama de Dispersão */}
          <Link
            to="/scatter"
            className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-teal-800 mb-2">Diagrama de Dispersão</h3>
            <p className="text-gray-600">
              Analise a relação entre duas variáveis e identifique correlações.
            </p>
          </Link>

          {/* Card para 5W2H */}
          <Link
            to="/5w2h"
            className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-orange-800 mb-2">5W2H</h3>
            <p className="text-gray-600">
              Defina ações com clareza respondendo a perguntas-chave.
            </p>
          </Link>

          {/* Card para Folhas de Verificação */}
          <Link
            to="/check-sheets"
            className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-cyan-800 mb-2">Folhas de Verificação</h3>
            <p className="text-gray-600">
              Colete e organize dados de forma estruturada para análise.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;