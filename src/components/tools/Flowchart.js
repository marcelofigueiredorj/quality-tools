import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { jsPDF } from 'jspdf';
// Definindo os nós e arestas iniciais
const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Início' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'Processo' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const Flowchart = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem('flowchartHistory');
        if (saved)
            setHistory(JSON.parse(saved));
    }, []);
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
    const saveFlowchart = () => {
        const flowchartData = { nodes, edges };
        const newHistory = [...history, flowchartData];
        setHistory(newHistory);
        localStorage.setItem('flowchartHistory', JSON.stringify(newHistory));
    };
    const exportToPDF = () => {
        const doc = new jsPDF();
        // Configurações gerais
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 15;
        const lineHeight = 7;
        let yPos = margin;
        // Adicionar cabeçalho
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(33, 37, 41); // Cor escura
        doc.text("Fluxograma", pageWidth / 2, yPos, { align: "center" });
        yPos += lineHeight * 2;
        // Adicionar data e hora
        const date = new Date().toLocaleString();
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100); // Cinza
        doc.text(`Gerado em: ${date}`, pageWidth - margin, yPos, { align: "right" });
        yPos += lineHeight * 2;
        // Adicionar nós
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(33, 37, 41); // Cor escura
        doc.text("Nós do Fluxograma:", margin, yPos);
        yPos += lineHeight;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        nodes.forEach((node, index) => {
            if (yPos > doc.internal.pageSize.getHeight() - 20) {
                doc.addPage(); // Adiciona nova página se o conteúdo ultrapassar o limite
                yPos = margin;
            }
            doc.text(`Nó ${index + 1}: ${node.data.label}`, margin + 5, yPos);
            yPos += lineHeight;
        });
        // Adicionar rodapé
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100); // Cinza
        doc.text("Relatório gerado automaticamente pela aplicação Fluxograma.", margin, yPos);
        // Salvar o PDF
        doc.save("fluxograma.pdf");
    };
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('flowchartHistory');
    };
    const loadHistoryItem = (item) => {
        setNodes(item.nodes);
        setEdges(item.edges);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Fluxograma" }), _jsx("div", { style: { height: '400px' }, children: _jsxs(ReactFlow, { nodes: nodes, edges: edges, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onConnect: onConnect, fitView: true, children: [_jsx(Background, {}), _jsx(Controls, {}), _jsx(MiniMap, {})] }) }), _jsxs("div", { className: "mt-4 flex space-x-4", children: [_jsx("button", { onClick: saveFlowchart, className: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200", children: "Salvar Fluxograma" }), _jsx("button", { onClick: exportToPDF, className: "px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200", children: "Exportar para PDF" })] }), history.length > 0 && (_jsxs("div", { className: "mt-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-gray-700 flex justify-between items-center", children: ["Hist\u00F3rico", _jsx("button", { onClick: clearHistory, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200", children: "Limpar Hist\u00F3rico" })] }), _jsx("ul", { className: "mt-2 space-y-2", children: history.map((item, index) => (_jsxs("li", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm", children: [_jsx("span", { children: `Fluxograma ${index + 1}` }), _jsx("button", { onClick: () => loadHistoryItem(item), className: "px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200", children: "Carregar" })] }, index))) })] }))] }) }));
};
export default Flowchart;
