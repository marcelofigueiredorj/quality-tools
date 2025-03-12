import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
const FiveW2H = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            what: '',
            why: '',
            where: '',
            when: '',
            who: '',
            how: '',
            howMuch: '',
        },
    });
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem('fiveW2HHistory');
        if (saved)
            setHistory(JSON.parse(saved));
    }, []);
    const onSubmit = (data) => {
        const newHistory = [...history, data];
        setHistory(newHistory);
        localStorage.setItem('fiveW2HHistory', JSON.stringify(newHistory));
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
        doc.text("Análise 5W2H", pageWidth / 2, yPos, { align: "center" });
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
        doc.text(`O quê: ${data.what}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Por quê: ${data.why}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Onde: ${data.where}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Quando: ${data.when}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Quem: ${data.who}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Como: ${data.how}`, margin + 5, yPos);
        yPos += lineHeight;
        doc.text(`Quanto: ${data.howMuch}`, margin + 5, yPos);
        yPos += lineHeight * 2;
        // Adicionar rodapé
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100); // Cinza
        doc.text("Relatório gerado automaticamente pela aplicação 5W2H.", margin, yPos);
        // Salvar o PDF
        doc.save("analise_5w2h.pdf");
    };
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('fiveW2HHistory');
    };
    const loadHistoryItem = (item) => {
        reset(item);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "5W2H" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "O qu\u00EA" }), _jsx("input", { ...register('what', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.what && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.what.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Por qu\u00EA" }), _jsx("input", { ...register('why', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.why && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.why.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Onde" }), _jsx("input", { ...register('where', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.where && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.where.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Quando" }), _jsx("input", { ...register('when', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.when && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.when.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Quem" }), _jsx("input", { ...register('who', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.who && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.who.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Como" }), _jsx("input", { ...register('how', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.how && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.how.message })] }), _jsxs("div", { className: "col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Quanto" }), _jsx("input", { ...register('howMuch', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" }), errors.howMuch && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.howMuch.message })] }), _jsx("button", { type: "submit", className: "col-span-2 mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200", children: "Salvar" })] }), history.length > 0 && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4", children: [_jsx("div", { className: "p-4 bg-blue-50 rounded-lg shadow", children: history[history.length - 1].what }), _jsx("div", { className: "p-4 bg-red-50 rounded-lg shadow", children: history[history.length - 1].why }), _jsx("div", { className: "p-4 bg-green-50 rounded-lg shadow", children: history[history.length - 1].where }), _jsx("div", { className: "p-4 bg-yellow-50 rounded-lg shadow", children: history[history.length - 1].when }), _jsx("div", { className: "p-4 bg-purple-50 rounded-lg shadow", children: history[history.length - 1].who }), _jsx("div", { className: "p-4 bg-orange-50 rounded-lg shadow", children: history[history.length - 1].how }), _jsx("div", { className: "col-span-2 p-4 bg-gray-50 rounded-lg shadow", children: history[history.length - 1].howMuch }), _jsx("button", { onClick: () => exportToPDF(history[history.length - 1]), className: "col-span-2 mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200", children: "Exportar para PDF" })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-gray-700 flex justify-between items-center", children: ["Hist\u00F3rico", _jsx("button", { onClick: clearHistory, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200", children: "Limpar Hist\u00F3rico" })] }), _jsx("ul", { className: "mt-2 space-y-2", children: history.map((item, index) => (_jsxs("li", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm", children: [_jsx("span", { children: `O quê: ${item.what}` }), _jsx("button", { onClick: () => loadHistoryItem(item), className: "px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200", children: "Carregar" })] }, index))) })] })] }))] }) }));
};
export default FiveW2H;
