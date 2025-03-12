import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { jsPDF } from 'jspdf';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Abc = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { items: '' },
    });
    const [history, setHistory] = useState([]);
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        const saved = localStorage.getItem('abcHistory');
        if (saved) {
            const parsedHistory = JSON.parse(saved);
            console.log('Histórico carregado:', parsedHistory);
            setHistory(parsedHistory);
        }
    }, []);
    const onSubmit = (data) => {
        console.log('Dados recebidos:', data);
        // Processar os itens
        const items = data.items.split(',').map(item => {
            const [name, value] = item.split(':');
            return { name: name?.trim() || `Item ${item}`, value: parseFloat(value?.trim() || '0') };
        }).filter(item => !isNaN(item.value) && item.value > 0);
        console.log('Itens processados:', items);
        if (items.length === 0) {
            console.error('Nenhum item válido encontrado.');
            return;
        }
        // Ordenar por valor decrescente
        items.sort((a, b) => b.value - a.value);
        console.log('Itens ordenados:', items);
        // Calcular o total
        const total = items.reduce((sum, item) => sum + item.value, 0);
        console.log('Total:', total);
        if (total === 0) {
            console.error('Total é zero, não é possível calcular a Curva ABC.');
            return;
        }
        // Calcular a porcentagem acumulada
        let cumulative = 0;
        const cumulativeData = items.map(item => {
            cumulative += (item.value / total) * 100;
            return { name: item.name, value: item.value, cumulative };
        });
        console.log('Dados cumulativos:', cumulativeData);
        // Atualizar o histórico
        const newHistory = [...history, data];
        setHistory(newHistory);
        localStorage.setItem('abcHistory', JSON.stringify(newHistory));
        console.log('Novo histórico:', newHistory);
        // Preparar dados para o gráfico
        setChartData({
            labels: cumulativeData.map(item => item.name),
            datasets: [
                {
                    label: 'Valor Acumulado (%)',
                    data: cumulativeData.map(item => item.cumulative),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        });
        console.log('Dados do gráfico:', chartData);
    };
    const exportToPDF = () => {
        if (history.length === 0)
            return;
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
        doc.text("Relatório da Curva ABC", pageWidth / 2, yPos, { align: "center" });
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
        doc.text("Itens Analisados:", margin, yPos);
        yPos += lineHeight;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const items = history[history.length - 1].items.split(",");
        items.forEach((item, index) => {
            if (yPos > doc.internal.pageSize.getHeight() - 20) {
                doc.addPage(); // Adiciona nova página se o conteúdo ultrapassar o limite
                yPos = margin;
            }
            doc.text(`${index + 1}. ${item.trim()}`, margin + 5, yPos);
            yPos += lineHeight;
        });
        // Adicionar gráfico
        if (chartData) {
            yPos += lineHeight * 2;
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Gráfico da Curva ABC:", margin, yPos);
            yPos += lineHeight;
            // Converter o gráfico em imagem
            const chartCanvas = document.querySelector("canvas");
            if (chartCanvas) {
                const chartImage = chartCanvas.toDataURL("image/png");
                const imgWidth = pageWidth - margin * 2;
                const imgHeight = (chartCanvas.height * imgWidth) / chartCanvas.width;
                if (yPos + imgHeight > doc.internal.pageSize.getHeight() - margin) {
                    doc.addPage(); // Adiciona nova página se o gráfico não couber
                    yPos = margin;
                }
                doc.addImage(chartImage, "PNG", margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + lineHeight;
            }
        }
        // Adicionar rodapé
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100); // Cinza
        doc.text("Relatório gerado automaticamente pela aplicação Curva ABC.", margin, yPos);
        // Salvar o PDF
        doc.save("relatorio_curva_abc.pdf");
    };
    const clearHistory = () => {
        setHistory([]);
        setChartData(null);
        localStorage.removeItem('abcHistory');
        console.log('Histórico limpo.');
    };
    const loadHistoryItem = (item) => {
        reset(item);
        onSubmit(item);
        console.log('Item do histórico carregado:', item);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Curva ABC" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "mb-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Itens (nome:valor, separados por v\u00EDrgula)" }), _jsx("input", { ...register('items', { required: 'Campo obrigatório' }), className: "mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500", placeholder: "Ex.: Item1:100,Item2:50,Item3:20" }), errors.items && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.items.message })] }), _jsx("button", { type: "submit", className: "mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200", children: "Calcular Curva ABC" })] }), chartData && (_jsxs("div", { className: "mt-6", children: [_jsx(Bar, { data: chartData, options: { responsive: true, plugins: { legend: { position: 'top' } } } }), _jsx("button", { onClick: exportToPDF, className: "mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200", children: "Exportar para PDF" })] })), history.length > 0 && (_jsxs("div", { className: "mt-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-gray-700 flex justify-between items-center", children: ["Hist\u00F3rico", _jsx("button", { onClick: clearHistory, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200", children: "Limpar Hist\u00F3rico" })] }), _jsx("ul", { className: "mt-2 space-y-2", children: history.map((item, index) => (_jsxs("li", { className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm", children: [_jsx("span", { children: `Itens: ${item.items}` }), _jsx("button", { onClick: () => loadHistoryItem(item), className: "px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200", children: "Carregar" })] }, index))) })] }))] }) }));
};
export default Abc;
