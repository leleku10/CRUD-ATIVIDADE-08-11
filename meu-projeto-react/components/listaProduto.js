import React, { useState, useEffect } from 'react';
import api from '../axios';
import EditarProduto from './editarProduto';  // Importando o componente de editar produto

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);  // Estado para armazenar o produto a ser editado

  // Carregar os produtos ao montar o componente
  useEffect(() => {
    api.get('produtos/')
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error('Erro ao carregar produtos:', error));
  }, []);

  // Função para excluir produto
  const excluirProduto = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      api.delete(`produtos/${id}/`)
        .then(() => {
          // Atualiza a lista de produtos após a exclusão
          setProdutos(produtos.filter(produto => produto.id !== id));
        })
        .catch((error) => console.error('Erro ao excluir produto:', error));
    }
  };

  // Função para atualizar a lista de produtos
  const atualizarProdutos = () => {
    api.get('produtos/')
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error('Erro ao carregar produtos:', error));
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>

      {produtoParaEditar ? (
        <EditarProduto
          produto={produtoParaEditar}
          atualizarProdutos={atualizarProdutos}
        />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.preco}</td>
                  <td>
                    <button onClick={() => setProdutoParaEditar(produto)}>
                      Editar
                    </button>
                    <button onClick={() => excluirProduto(produto.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListaProdutos;
