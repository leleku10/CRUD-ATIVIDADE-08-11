import React, { useState } from 'react';
import AdicionarProduto from './components/AdicionarProduto';
import ListaProdutos from './components/ListaProdutos';
import EditarProduto from './components/EditarProduto';  // Componente para editar produto

function App() {
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  // Função para atualizar a lista de produtos (passada para os componentes filhos)
  const atualizarProdutos = () => {
    setProdutoParaEditar(null);
  };

  return (
    <div className="App">
      <h1>Controle de Estoque</h1>
      {produtoParaEditar ? (
        <EditarProduto produto={produtoParaEditar} atualizarProdutos={atualizarProdutos} />
      ) : (
        <>
          <AdicionarProduto atualizarProdutos={atualizarProdutos} />
          <ListaProdutos setProdutoParaEditar={setProdutoParaEditar} />
        </>
      )}
    </div>
  );
}

export default App;
