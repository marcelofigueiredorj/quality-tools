import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';

type FormData = {
  plan: string;
  do: string;
  check: string;
  act: string;
};

const Pdca: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: { plan: '', do: '', check: '', act: '' },
  });
  const [history, setHistory] = useState<FormData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pdcaHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const onSubmit = (data: FormData) => {
    const newHistory = [...history, data];
    setHistory(newHistory);
    localStorage.setItem('pdcaHistory', JSON.stringify(newHistory));
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
    doc.text("Ciclo PDCA", pageWidth / 2, yPos, { align: "center" });
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
    doc.text("Detalhes do Ciclo PDCA:", margin, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Planejar: ${data.plan}`, margin + 5, yPos);
    yPos += lineHeight;
    doc.text(`Executar: ${data.do}`, margin + 5, yPos);
    yPos += lineHeight;
    doc.text(`Verificar: ${data.check}`, margin + 5, yPos);
    yPos += lineHeight;
    doc.text(`Agir: ${data.act}`, margin + 5, yPos);
    yPos += lineHeight * 2;

    // Adicionar rodapé
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100); // Cinza
    doc.text("Relatório gerado automaticamente pela aplicação Ciclo PDCA.", margin, yPos);

    // Salvar o PDF
    doc.save("ciclo_pdca.pdf");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('pdcaHistory');
  };

  const loadHistoryItem = (item: FormData) => {
    reset(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ciclo PDCA</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Planejar</label>
            <input
              {...register('plan', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.plan && <p className="text-red-500 text-sm mt-1">{errors.plan.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Executar</label>
            <input
              {...register('do', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.do && <p className="text-red-500 text-sm mt-1">{errors.do.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Verificar</label>
            <input
              {...register('check', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.check && <p className="text-red-500 text-sm mt-1">{errors.check.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Agir</label>
            <input
              {...register('act', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.act && <p className="text-red-500 text-sm mt-1">{errors.act.message}</p>}
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
              <div className="p-4 bg-blue-50 rounded-lg shadow">{history[history.length - 1].plan}</div>
              <div className="p-4 bg-red-50 rounded-lg shadow">{history[history.length - 1].do}</div>
              <div className="p-4 bg-green-50 rounded-lg shadow">{history[history.length - 1].check}</div>
              <div className="p-4 bg-yellow-50 rounded-lg shadow">{history[history.length - 1].act}</div>
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
                    <span>{`Planejar: ${item.plan} | Executar: ${item.do}`}</span>
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

export default Pdca;