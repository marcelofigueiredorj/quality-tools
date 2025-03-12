import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
const Ishikawa = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            problem: '',
            manpower: '',
            material: '',
            method: '',
            machine: '',
            measurement: '',
            environment: '',
        },
    });
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem('ishikawaHistory');
        if (saved)
            setHistory(JSON.parse(saved));
    }, []);
    const onSubmit = (data) => {
        const newHistory = [...history, data];
        setHistory(newHistory);
        localStorage.setItem('ishikawaHistory', JSON.stringify(newHistory));
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
        doc.text("Diagrama de Ishikawa", pageWidth / 2, yPos, { align: "center" });
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
        doc.text("Detalhes do Diagrama:", margin, yPos);
        yPos += lineHeight;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Problema: ${data.problem}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Mão de Obra: ${data.manpower}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Material: ${data.material}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Método: ${data.method}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Máquina: ${data.machine}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Medição: ${data.measurement}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Ambiente: ${data.environment}`, margin + 5, yPos);
        yPos += lineHeight * 2;
        // Adicionar rodapé
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100); // Cinza
        doc.text("Relatório gerado automaticamente pela aplicação Diagrama de Ishikawa.", margin, yPos);
        // Salvar o PDF
        doc.save("diagrama_ishikawa.pdf");
    };
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('ishikawaHistory');
    };
    const loadHistoryItem = (item) => {
        reset(item);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Diagrama de Ishikawa" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { className: "col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Problema" }), _jsx("input", { ...register('problem', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.problem && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.problem.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "M\u00E3o de Obra" }), _jsx("input", { ...register('manpower', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.manpower && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.manpower.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Material" }), _jsx("input", { ...register('material', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.material && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.material.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "M\u00E9todo" }), _jsx("input", { ...register('method', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.method && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.method.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "M\u00E1quina" }), _jsx("input", { ...register('machine', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.machine && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.machine.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Medi\u00E7\u00E3o" }), _jsx("input", { ...register('measurement', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.measurement && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.measurement.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Ambiente" }), _jsx("input", { ...register('environment', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.environment && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.environment.message })] }), _jsx("button", { type: "submit", className: "col-span-2 mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200", children: "Salvar" })] }), history.length > 0 && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4", children: [_jsx("div", { className: "p-4 bg-blue-50 rounded-lg shadow", children: history[history.length - 1].manpower }), _jsx("div", { className: "p-4 bg-red-50 rounded-lg shadow", children: history[history.length - 1].material }), _jsx("div", { className: "p-4 bg-green-50 rounded-lg shadow", children: history[history.length - 1].method }), _jsx("div", { className: "p-4 bg-yellow-50 rounded-lg shadow", children: history[history.length - 1].machine }), _jsx("div", { className: "p-4 bg-purple-50 rounded-lg shadow", children: history[history.length - 1].measurement }), _jsx("div", { className: "p-4 bg-orange-50 rounded-lg shadow", children: history[history.length - 1].environment }), _jsx("button", { onClick: () => exportToPDF(history[history.length - 1]), className: "col-span-2 mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200", children: "Exportar para PDF" })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-gray-700 flex justify-between items-center", children: ["Hist\u00F3rico", _jsx("button", { onClick: clearHistory, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200", children: "Limpar Hist\u00F3rico" })] }), _jsx("ul", { className: "mt-2 space-y-2", children: history.map((item, index) => (_jsxs("li", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm", children: [_jsx("span", { children: `Problema: ${item.problem}` }), _jsx("button", { onClick: () => loadHistoryItem(item), className: "px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200", children: "Carregar" })] }, index))) })] })] }))] }) }));
};
export default Ishikawa;
