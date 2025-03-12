import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { jsPDF } from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type FormData = {
  items: string; // Ex.: "Item1:100,Item2:50,Item3:20"
};

const Abc: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: { items: '' },
  });
  const [history, setHistory] = useState<FormData[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('abcHistory');
    if (saved) {
      const parsedHistory = JSON.parse(saved);
      console.log('Histórico carregado:', parsedHistory);
      setHistory(parsedHistory);
    }
  }, []);

  const onSubmit = (data: FormData) => {
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
    if (history.length === 0) return;

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
      const chartCanvas = document.querySelector("canvas") as HTMLCanvasElement;
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

  const loadHistoryItem = (item: FormData) => {
    reset(item);
    onSubmit(item);
    console.log('Item do histórico carregado:', item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Curva ABC</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Itens (nome:valor, separados por vírgula)</label>
            <input
              {...register('items', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Ex.: Item1:100,Item2:50,Item3:20"
            />
            {errors.items && <p className="text-red-500 text-sm mt-1">{errors.items.message}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Calcular Curva ABC
          </button>
        </form>
        {chartData && (
          <div className="mt-6">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            <button
              onClick={exportToPDF}
              className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              Exportar para PDF
            </button>
          </div>
        )}
        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 flex justify-between items-center">
              Histórico
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Limpar Histórico
              </button>
            </h3>
            <ul className="mt-2 space-y-2">
              {history.map((item, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                  <span>{`Itens: ${item.items}`}</span>
                  <button
                    onClick={() => loadHistoryItem(item)}
                    className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                  >
                    Carregar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Abc;