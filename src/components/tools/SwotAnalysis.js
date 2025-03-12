import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
const SwotAnalysis = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { strengths: '', weaknesses: '', opportunities: '', threats: '' },
    });
    const [history, setHistory] = React.useState([]);
    useEffect(() => {
        const saved = localStorage.getItem('swotHistory');
        if (saved)
            setHistory(JSON.parse(saved));
    }, []);
    const onSubmit = (data) => {
        const newHistory = [...history, data];
        setHistory(newHistory);
        localStorage.setItem('swotHistory', JSON.stringify(newHistory));
    };
    const exportToPDF = (data) => {
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
        doc.text("Análise SWOT", pageWidth / 2, yPos, { align: "center" });
        yPos += lineHeight * 2;
        // Adicionar data e hora
        const date = new Date().toLocaleString();
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100); // Cinza
        doc.text(`Gerado em: ${date}`, pageWidth - margin, yPos, { align: "right" });
        yPos += lineHeight * 2;
        // Adicionar itens
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(33, 37, 41); // Cor escura
        doc.text("Detalhes da Análise:", margin, yPos);
        yPos += lineHeight;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Forças: ${data.strengths}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Fraquezas: ${data.weaknesses}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Oportunidades: ${data.opportunities}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Ameaças: ${data.threats}`, margin + 5, yPos);
        yPos += lineHeight * 2;
        // Adicionar rodapé
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100); // Cinza
        doc.text("Relatório gerado automaticamente pela aplicação Análise SWOT.", margin, yPos);
        // Salvar o PDF
        doc.save("analise_swot.pdf");
    };
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('swotHistory');
    };
    const loadHistoryItem = (item) => {
        reset(item);
    };
    return (_jsx("div", { className: "flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200", children: _jsx("main", { className: "flex-1 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "An\u00E1lise SWOT" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "For\u00E7as" }), _jsx("input", { ...register('strengths', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.strengths && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.strengths.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Fraquezas" }), _jsx("input", { ...register('weaknesses', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.weaknesses && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.weaknesses.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Oportunidades" }), _jsx("input", { ...register('opportunities', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.opportunities && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.opportunities.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Amea\u00E7as" }), _jsx("input", { ...register('threats', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.threats && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.threats.message })] }), _jsx("button", { type: "submit", className: "col-span-2 mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200", children: "Salvar" })] }), history.length > 0 && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4", children: [_jsx("div", { className: "p-4 bg-blue-50 rounded-lg shadow", children: history[history.length - 1].strengths }), _jsx("div", { className: "p-4 bg-red-50 rounded-lg shadow", children: history[history.length - 1].weaknesses }), _jsx("div", { className: "p-4 bg-green-50 rounded-lg shadow", children: history[history.length - 1].opportunities }), _jsx("div", { className: "p-4 bg-yellow-50 rounded-lg shadow", children: history[history.length - 1].threats }), _jsx("button", { onClick: () => exportToPDF(history[history.length - 1]), className: "col-span-2 mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200", children: "Exportar para PDF" })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-gray-700 flex justify-between items-center", children: ["Hist\u00F3rico", _jsx("button", { onClick: clearHistory, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200", children: "Limpar Hist\u00F3rico" })] }), _jsx("ul", { className: "mt-2 space-y-2", children: history.map((item, index) => (_jsxs("li", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm", children: [_jsx("span", { children: `Forças: ${item.strengths} | Fraquezas: ${item.weaknesses} | Oportunidades: ${item.opportunities} | Ameaças: ${item.threats}` }), _jsx("button", { onClick: () => loadHistoryItem(item), className: "px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200", children: "Carregar" })] }, index))) })] })] }))] }) }) }));
};
export default SwotAnalysis;
