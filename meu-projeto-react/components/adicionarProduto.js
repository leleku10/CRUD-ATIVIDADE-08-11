import React, { useState } from 'react';
import api from '../axios';

const AdicionarProduto = ({ atualizarProdutos }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoProduto = { nome, descricao, quantidade, preco };

    api.post('produtos/', novoProduto)
      .then(() => {
        atualizarProdutos();
        setNome('');
        setDescricao('');
        setQuantidade('');
        setPreco('');
      })
      .catch(error => console.error('Erro ao adicionar produto:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Adicionar Produto</h1>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
      <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AdicionarProduto;
