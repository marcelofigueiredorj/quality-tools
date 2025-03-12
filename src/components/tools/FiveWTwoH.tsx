import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';

type FormData = {
  what: string;
  why: string;
  where: string;
  when: string;
  who: string;
  how: string;
  howMuch: string;
};

const FiveW2H: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
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
  const [history, setHistory] = useState<FormData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('fiveW2HHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const onSubmit = (data: FormData) => {
    const newHistory = [...history, data];
    setHistory(newHistory);
    localStorage.setItem('fiveW2HHistory', JSON.stringify(newHistory));
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

  const loadHistoryItem = (item: FormData) => {
    reset(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">5W2H</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">O quê</label>
            <input
              {...register('what', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.what && <p className="text-red-500 text-sm mt-1">{errors.what.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Por quê</label>
            <input
              {...register('why', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.why && <p className="text-red-500 text-sm mt-1">{errors.why.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Onde</label>
            <input
              {...register('where', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.where && <p className="text-red-500 text-sm mt-1">{errors.where.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quando</label>
            <input
              {...register('when', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.when && <p className="text-red-500 text-sm mt-1">{errors.when.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quem</label>
            <input
              {...register('who', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.who && <p className="text-red-500 text-sm mt-1">{errors.who.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Como</label>
            <input
              {...register('how', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.how && <p className="text-red-500 text-sm mt-1">{errors.how.message}</p>}
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Quanto</label>
            <input
              {...register('howMuch', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.howMuch && <p className="text-red-500 text-sm mt-1">{errors.howMuch.message}</p>}
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
              <div className="p-4 bg-blue-50 rounded-lg shadow">{history[history.length - 1].what}</div>
              <div className="p-4 bg-red-50 rounded-lg shadow">{history[history.length - 1].why}</div>
              <div className="p-4 bg-green-50 rounded-lg shadow">{history[history.length - 1].where}</div>
              <div className="p-4 bg-yellow-50 rounded-lg shadow">{history[history.length - 1].when}</div>
              <div className="p-4 bg-purple-50 rounded-lg shadow">{history[history.length - 1].who}</div>
              <div className="p-4 bg-orange-50 rounded-lg shadow">{history[history.length - 1].how}</div>
              <div className="col-span-2 p-4 bg-gray-50 rounded-lg shadow">{history[history.length - 1].howMuch}</div>
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
                    <span>{`O quê: ${item.what}`}</span>
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
    </div>
  );
};

export default FiveW2H;