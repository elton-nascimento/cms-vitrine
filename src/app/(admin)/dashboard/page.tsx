// src/app/(admin)/dashboard/page.tsx
"use client";

import { useState, useEffect, FormEvent } from 'react';

type SettingsData = {
  businessName?: string;
  phone?: string;
  address?: string;
};

export default function DashboardPage() {
  const [settings, setSettings] = useState<SettingsData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 1. BUSCAR DADOS: useEffect para buscar os dados quando o componente montar
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (response.ok) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        setMessage('Erro ao carregar dados.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []); // O array vazio garante que isso rode apenas uma vez

  // 2. SALVAR DADOS: Função para lidar com o envio do formulário
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('Salvando...');

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage('Configurações salvas com sucesso!');
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao salvar: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setMessage('Ocorreu um erro de rede.');
    }

    // Limpa a mensagem após 3 segundos
    setTimeout(() => setMessage(''), 3000);
  };

  // Função para atualizar o estado quando um campo do formulário muda
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <div className="text-center p-4">Carregando configurações...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configurações do Site</h1>

      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium mb-1">
            Nome do Negócio
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={settings.businessName || ''}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Telefone / WhatsApp
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={settings.phone || ''}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Endereço
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={settings.address || ''}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold"
          >
            Salvar Alterações
          </button>
          {message && <p className="text-sm text-gray-300">{message}</p>}
        </div>
      </form>
    </div>
  );
}
