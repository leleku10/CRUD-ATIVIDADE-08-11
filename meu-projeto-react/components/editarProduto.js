import React, { useState, useEffect } from 'react';
import api from '../axios';  // Importando a configuração do axios

const EditarProduto = ({ produto, atualizarProdutos }) => {
  const [nome, setNome] = useState(produto.nome || '');
  const [descricao, setDescricao] = useState(produto.descricao || '');
  const [quantidade, setQuantidade] = useState(produto.quantidade || '');
  const [preco, setPreco] = useState(produto.preco || '');

  // Atualiza o estado do formulário quando o produto mudar
  useEffect(() => {
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setQuantidade(produto.quantidade);
    setPreco(produto.preco);
  }, [produto]);

  // Função para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Objeto com os dados atualizados do produto
    const produtoAtualizado = { nome, descricao, quantidade, preco };

    // Envia os dados para a API (PUT para atualizar o produto)
    api.put(`produtos/${produto.id}/`, produtoAtualizado)
      .then(() => {
        // Atualiza a lista de produtos após a edição
        atualizarProdutos();
      })
      .catch((error) => console.error('Erro ao editar produto:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Produto</h1>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />
      
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      
      <button type="submit">Salvar alterações</button>
    </form>
  );
};

export default EditarProduto;
