import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const products = [
    {
      id: '1',
      name: 'Bandeja de isopor PCT',
      image: './assets/bandeja.png',
      sizes: ['P', 'M', 'G'] // Variações de tamanho
    },
    {
      id: '2',
      name: 'Bobina picotada RL',
      image: './assets/bobina.png',
      sizes: ['25x35cm', '30x40 cm', '35x45 cm', '40x60 cm']
    },
    {
      id: '3',
      name: 'Canudos PCT',
      image: './assets/canudos.png',
      sizes: ['Médio', 'Longo']
    },
    {
      id: '4',
      name: 'Colher descartável PCT',
      image: './assets/colher.png',
      sizes: ['Único']
    },
    {
      id: '5',
      name: 'Copo descartável CX',
      image: './assets/copo.png',
      sizes: ['180 ml', '200 ml', '300 ml', '350 ml', '400 ml', '500 ml']
    },
    {
      id: '6',
      name: 'Etiqueta RL',
      image: './assets/etiqueta.png',
      sizes: ['Único']
    },
    {
      id: '7',
      name: 'Fita adesiva RL',
      image: './assets/fita.png',
      sizes: ['45 mts', '100 mts']
    },
    {
      id: '8',
      name: 'Sacos para lixo RL',
      image: './assets/lixo.png',
      sizes: ['15 lts', '30 lts', '50 lts', '100 lts', '200 lts']
    },
    {
      id: '9',
      name: 'Sacola de papel PCT',
      image: './assets/papel.png',
      sizes: ['P', 'M', 'G']
    },
    {
      id: '10',
      name: 'Sacola boca vazada PCT',
      image: './assets/plast.png',
      sizes: ['20x30 cm', '25x35 cm', '30x40 cm', '35x45 cm', '40x60 cm']
    },
    {
      id: '11',
      name: 'Sacos para pipoca PCT',
      image: './assets/pipoca.png',
      sizes: ['N°1', 'N°2', 'N°3', 'N°4']
    },
    {
      id: '12',
      name: 'Saco plástico PP PCT',
      image: './assets/saco.png',
      sizes: ['15x20 cm', '20x30 cm', '25x35 cm', '30x40 cm', '35x45 cm', '40x60 cm', '50x80 cm']
    },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    if (currentProduct) {
      setSelectedSize(currentProduct.sizes[0]);
    }
  }, [currentProduct]);

  const confirmSelection = () => {
    if (!currentProduct) return;
    const selectedItem = {
      id: `${currentProduct.id}-${selectedSize}`, // Unique ID for item + size
      name: currentProduct.name,
      size: selectedSize,
      quantity: quantity,
    };

    // Check if item with same size already exists
    const existingItemIndex = selectedItems.findIndex(item => item.id === selectedItem.id);

    if (existingItemIndex > -1) {
      const newItems = [...selectedItems];
      newItems[existingItemIndex].quantity = parseInt(newItems[existingItemIndex].quantity) + parseInt(quantity);
      setSelectedItems(newItems);
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }

    setModalVisible(false);
  };

  const sendMessage = () => {
    const message = selectedItems
      .map(item => `${item.quantity}x ${item.name} (Tamanho: ${item.size})`)
      .join(', ');
    const fullMessage = `Olá, gostaria de solicitar um orçamento para os seguintes itens: ${message}`;
    const phoneNumber = '556392341553';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank');
  };

  const removeItem = (index) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
  };

  const handleQuantityChange = (value, index) => {
    const newItems = [...selectedItems];
    newItems[index].quantity = value;
    setSelectedItems(newItems);
  };

  const openSelectionModal = (item) => {
    setCurrentProduct(item);
    setQuantity('1');
    setModalVisible(true);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Bem vindo ao nosso catálogo!</h1>
      </header>

      <main className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-item">
            <img src={item.image} alt={item.name} className="product-image" />
            <p>{item.name}</p>
            <button className="select-button" onClick={() => openSelectionModal(item)}>
              Selecionar
            </button>
          </div>
        ))}
      </main>

      <div className="footer-button">
        <button onClick={() => setEditModalVisible(true)} disabled={selectedItems.length === 0}>
          Revisar e Enviar Pedido
        </button>
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-view">
            <h2 className="modal-text">Selecione o tamanho e quantidade de {currentProduct?.name}</h2>

            <label className="label">Tamanho:</label>
            <select
              value={selectedSize}
              className="picker"
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {currentProduct?.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <label className="label">Quantidade:</label>
            <input
              className="input"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />

            <div className="modal-buttons">
              <button onClick={confirmSelection}>Confirmar</button>
              <button onClick={() => setModalVisible(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {editModalVisible && (
        <div className="modal-overlay">
          <div className="modal-view">
            <h2 className="modal-text">Revise seu pedido</h2>
            <div className="selected-items-list">
              {selectedItems.map((item, index) => (
                <div key={item.id} className="selected-item">
                  <span>{item.name} (Tamanho: {item.size})</span>
                  <div className="selected-item-controls">
                    <input
                      className="input quantity-input"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e.target.value, index)}
                      min="1"
                    />
                    <button className="remove-button" onClick={() => removeItem(index)}>Remover</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button onClick={sendMessage}>Enviar via WhatsApp</button>
              <button onClick={() => setEditModalVisible(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
