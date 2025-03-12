import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { jsPDF } from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type FormData = {
  data: string; // Ex.: "10,12,11,13,9"
};

const ControlCharts: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: { data: '' },
  });
  const [history, setHistory] = useState<FormData[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('controlChartsHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const onSubmit = (data: FormData) => {
    const numbers = data.data.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    const stdDev = Math.sqrt(numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length);
    const upperLimit = mean + 3 * stdDev;
    const lowerLimit = mean - 3 * stdDev;

    const newHistory = [...history, data];
    setHistory(newHistory);
    localStorage.setItem('controlChartsHistory', JSON.stringify(newHistory));

    setChartData({
      labels: numbers.map((_, index) => `Amostra ${index + 1}`),
      datasets: [
        {
          label: 'Dados',
          data: numbers,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        },
        {
          label: 'Média',
          data: numbers.map(() => mean),
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderDash: [5, 5],
        },
        {
          label: 'Limite Superior',
          data: numbers.map(() => upperLimit),
          fill: false,
          borderColor: 'rgba(255, 206, 86, 1)',
          borderDash: [5, 5],
        },
        {
          label: 'Limite Inferior',
          data: numbers.map(() => lowerLimit),
          fill: false,
          borderColor: 'rgba(255, 206, 86, 1)',
          borderDash: [5, 5],
        },
      ],
    });
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
    doc.text("Carta de Controle", pageWidth / 2, yPos, { align: "center" });
    yPos += lineHeight * 2;

    // Adicionar data e hora
    const date = new Date().toLocaleString();
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100); // Cinza
    doc.text(`Gerado em: ${date}`, pageWidth - margin, yPos, { align: "right" });
    yPos += lineHeight * 2;

    // Adicionar dados
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41); // Cor escura
    doc.text("Dados Analisados:", margin, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Dados: ${history[history.length - 1].data}`, margin + 5, yPos);
    yPos += lineHeight * 2;

    // Adicionar gráfico
    if (chartData) {
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
    doc.text("Relatório gerado automaticamente pela aplicação Cartas de Controle.", margin, yPos);

    // Salvar o PDF
    doc.save("carta_controle.pdf");
  };

  const clearHistory = () => {
    setHistory([]);
    setChartData(null);
    localStorage.removeItem('controlChartsHistory');
  };

  const loadHistoryItem = (item: FormData) => {
    reset(item);
    onSubmit(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Cartas de Controle</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Dados (separados por vírgula)</label>
            <input
              {...register('data', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Ex.: 10,12,11,13,9"
            />
            {errors.data && <p className="text-red-500 text-sm mt-1">{errors.data.message}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Gerar Carta de Controle
          </button>
        </form>
        {chartData && (
          <div className="mt-6">
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
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
                  <span>{`Dados: ${item.data}`}</span>
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

export default ControlCharts;