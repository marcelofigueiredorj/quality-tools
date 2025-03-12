import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';

type FormData = {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
};

const SwotAnalysis: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: { strengths: '', weaknesses: '', opportunities: '', threats: '' },
  });
  const [history, setHistory] = React.useState<FormData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('swotHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const onSubmit = (data: FormData) => {
    const newHistory = [...history, data];
    setHistory(newHistory);
    localStorage.setItem('swotHistory', JSON.stringify(newHistory));
  };

  const exportToPDF = (data: FormData) => {
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

  const loadHistoryItem = (item: FormData) => {
    reset(item);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Análise SWOT</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Forças</label>
              <input
                {...register('strengths', { required: 'Campo obrigatório' })}
                className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {errors.strengths && <p className="text-red-500 text-sm mt-1">{errors.strengths.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fraquezas</label>
              <input
                {...register('weaknesses', { required: 'Campo obrigatório' })}
                className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {errors.weaknesses && <p className="text-red-500 text-sm mt-1">{errors.weaknesses.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Oportunidades</label>
              <input
                {...register('opportunities', { required: 'Campo obrigatório' })}
                className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {errors.opportunities && <p className="text-red-500 text-sm mt-1">{errors.opportunities.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ameaças</label>
              <input
                {...register('threats', { required: 'Campo obrigatório' })}
                className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {errors.threats && <p className="text-red-500 text-sm mt-1">{errors.threats.message}</p>}
            </div>
            <button
              type="submit"
              className="col-span-2 mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Salvar
            </button>
          </form>
          {history.length > 0 && (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg shadow">{history[history.length - 1].strengths}</div>
                <div className="p-4 bg-red-50 rounded-lg shadow">{history[history.length - 1].weaknesses}</div>
                <div className="p-4 bg-green-50 rounded-lg shadow">{history[history.length - 1].opportunities}</div>
                <div className="p-4 bg-yellow-50 rounded-lg shadow">{history[history.length - 1].threats}</div>
                <button
                  onClick={() => exportToPDF(history[history.length - 1])}
                  className="col-span-2 mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Exportar para PDF
                </button>
              </div>
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
                      <span>{`Forças: ${item.strengths} | Fraquezas: ${item.weaknesses} | Oportunidades: ${item.opportunities} | Ameaças: ${item.threats}`}</span>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SwotAnalysis;