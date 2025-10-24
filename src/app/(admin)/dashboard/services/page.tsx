// src/app/(admin)/dashboard/services/page.tsx
"use client";

import { useState, useEffect, FormEvent } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// Tipagem para o objeto de serviço
interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({}); // Para criar ou editar

  // Busca os serviços da API quando a página carrega
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('/api/services');

    // 👇👇👇 INÍCIO DA CORREÇÃO 👇👇👇
    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Verifica se a resposta tem conteúdo antes de tentar o .json()
    const text = await response.text();
    const data = text ? JSON.parse(text) : []; // Se o texto for vazio, usa um array vazio
    // 👆👆👆 FIM DA CORREÇÃO 👆👆👆

    setServices(data);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    // Define services como um array vazio em caso de erro para evitar que a UI quebre
    setServices([]);
  } finally {
    setIsLoading(false);
  }
};

  const handleOpenModal = (service?: Service) => {
    setCurrentService(service || {}); // Se passar um serviço, é edição. Se não, é criação.
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentService({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = currentService.id ? `/api/services/${currentService.id}` : '/api/services';
    const method = currentService.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...currentService,
          price: currentService.price ? parseFloat(String(currentService.price)) : null,
        }),
      });

      if (response.ok) {
        handleCloseModal();
        fetchServices(); // Recarrega a lista de serviços
      } else {
        console.error("Erro ao salvar o serviço");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchServices(); // Recarrega a lista
        } else {
          console.error("Erro ao excluir o serviço");
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      }
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Serviços</h1>
        <button onClick={() => handleOpenModal()} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold">
          <PlusCircle className="h-5 w-5 mr-2" />
          Novo Serviço
        </button>
      </div>

      {/* Tabela de Serviços */}
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {isLoading ? (
              <tr><td colSpan={3} className="text-center py-4">Carregando...</td></tr>
            ) : (
              services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.price ? `R$ ${service.price.toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenModal(service)} className="text-indigo-400 hover:text-indigo-300 mr-4"><Edit className="h-5 w-5" /></button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-400"><Trash2 className="h-5 w-5" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Adicionar/Editar Serviço */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{currentService.id ? 'Editar Serviço' : 'Novo Serviço'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                <input type="text" id="name" value={currentService.name || ''} onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })} required className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Descrição</label>
                <input type="text" id="description" value={currentService.description || ''} onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })} className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">Preço</label>
                <input type="number" step="0.01" id="price" value={currentService.price || ''} onChange={(e) => setCurrentService({ ...currentService, price: parseFloat(e.target.value) })} className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
