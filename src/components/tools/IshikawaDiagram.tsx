import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';

type FormData = {
  problem: string;
  manpower: string;
  material: string;
  method: string;
  machine: string;
  measurement: string;
  environment: string;
};

const Ishikawa: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
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
  const [history, setHistory] = useState<FormData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ishikawaHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const onSubmit = (data: FormData) => {
    const newHistory = [...history, data];
    setHistory(newHistory);
    localStorage.setItem('ishikawaHistory', JSON.stringify(newHistory));
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

  const loadHistoryItem = (item: FormData) => {
    reset(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Diagrama de Ishikawa</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Problema</label>
            <input
              {...register('problem', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mão de Obra</label>
            <input
              {...register('manpower', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.manpower && <p className="text-red-500 text-sm mt-1">{errors.manpower.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Material</label>
            <input
              {...register('material', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.material && <p className="text-red-500 text-sm mt-1">{errors.material.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Método</label>
            <input
              {...register('method', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.method && <p className="text-red-500 text-sm mt-1">{errors.method.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Máquina</label>
            <input
              {...register('machine', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.machine && <p className="text-red-500 text-sm mt-1">{errors.machine.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Medição</label>
            <input
              {...register('measurement', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.measurement && <p className="text-red-500 text-sm mt-1">{errors.measurement.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ambiente</label>
            <input
              {...register('environment', { required: 'Campo obrigatório' })}
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.environment && <p className="text-red-500 text-sm mt-1">{errors.environment.message}</p>}
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
              <div className="p-4 bg-blue-50 rounded-lg shadow">{history[history.length - 1].manpower}</div>
              <div className="p-4 bg-red-50 rounded-lg shadow">{history[history.length - 1].material}</div>
              <div className="p-4 bg-green-50 rounded-lg shadow">{history[history.length - 1].method}</div>
              <div className="p-4 bg-yellow-50 rounded-lg shadow">{history[history.length - 1].machine}</div>
              <div className="p-4 bg-purple-50 rounded-lg shadow">{history[history.length - 1].measurement}</div>
              <div className="p-4 bg-orange-50 rounded-lg shadow">{history[history.length - 1].environment}</div>
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
                    <span>{`Problema: ${item.problem}`}</span>
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

export default Ishikawa;