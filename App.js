import React, { useState } from 'react'; //Importação de requisitos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Linking, FlatList, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const products = [
    {
      id: '1',
      name: 'Bandeja de isopor PCT',
      image: require('./assets/bandeja.png'),
      quantity: 0, // Atributo de quantidade
      sizes: ['P', 'M', 'G'] // Variações de tamanho
    },
    {
      id: '2',
      name: 'Bobina picotada RL',
      image: require('./assets/bobina.png'),
      quantity: 0, 
      sizes: ['25x35cm', '30x40 cm', '35x45 cm', '40x60 cm']
    },
    {
      id: '3',
      name: 'Canudos PCT',
      image: require('./assets/canudos.png'),
      quantity: 0, 
      sizes: ['Médio', 'Longo']
    },
    {
      id: '4',
      name: 'Colher descartável PCT',
      image: require('./assets/colher.png'),
      quantity: 0, 
      sizes: ['Único'] 
    },
    {
      id: '5',
      name: 'Copo descartável CX',
      image: require('./assets/copo.png'),
      quantity: 0, 
      sizes: ['180 ml', '200 ml', '300 ml', '350 ml', '400 ml', '500 ml'] 
    },
    {
      id: '6',
      name: 'Etiqueta RL',
      image: require('./assets/etiqueta.png'),
      quantity: 0, 
      sizes: ['Único'] 
    },
    {
      id: '7',
      name: 'Fita adesiva RL',
      image: require('./assets/fita.png'),
      quantity: 0, 
      sizes: ['45 mts', '100 mts'] 
    },
    {
      id: '8',
      name: 'Sacos para lixo RL',
      image: require('./assets/lixo.png'),
      quantity: 0, 
      sizes: ['15 lts', '30 lts', '50 lts', '100 lts','200 lts']
    },
    {
      id: '9',
      name: 'Sacola de papel PCT',
      image: require('./assets/papel.png'),
      quantity: 0,
      sizes: ['P', 'M', 'G']
    },
    {
      id: '10',
      name: 'Sacola boca vazada PCT',
      image: require('./assets/plast.png'),
      quantity: 0,
      sizes: ['20x30 cm', '25x35 cm', '30x40 cm', '35x45 cm', '40x60 cm']
    },
    {
      id: '11',
      name: 'Sacos para pipoca PCT',
      image: require('./assets/pipoca.png'),
      quantity: 0,
      sizes: ['N°1', 'N°2', 'N°3', 'N°4']
    },
    {
      id: '12',
      name: 'Saco plástico PP PCT',
      image: require('./assets/saco.png'),
      quantity: 0,
      sizes: ['15x20 cm', '20x30 cm', '25x35 cm', '30x40 cm', '35x45 cm', '40x60 cm', '50x80 cm']
    },
    
  ];

  const [selectedItems, setSelectedItems] = useState([]); // Armazenar os itens selecionados com useState
  const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal
  const [currentProduct, setCurrentProduct] = useState(null); // Produto selecionado no modal
  const [selectedSize, setSelectedSize] = useState(''); // Tamanho selecionado
  const [quantity, setQuantity] = useState('1'); // Quantidade selecionada
  const [editModalVisible, setEditModalVisible] = useState(false); // Visibilidade modal de edição

  // Função de confirmar seleção de tamanho e quantidade
  const confirmSelection = () => {
    const selectedItem = {
      name: currentProduct.name,
      size: selectedSize,
      quantity: quantity,
    };
    setSelectedItems([...selectedItems, selectedItem]); // Adiciona o item com tamanho e quantidade ao carrinho
    setModalVisible(false); // Fecha o modal
  };

  // Função para enviar a solicitação de orçamento via WhatsApp
  const sendMessage = () => {
    const message = selectedItems
      .map(item => `${item.quantity}x ${item.name} (Tamanho: ${item.size})`)
      .join(', ');
    const fullMessage = `Olá, gostaria de solicitar um orçamento para os seguintes itens: ${message}`;
    const phoneNumber = '556392341553'; // Número no formato internacional sem o "+"
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(fullMessage)}`;
    Linking.openURL(url)
      .catch(() => {
        alert('Não foi possível abrir o WhatsApp.');
      });
  };

  // Função para remover um item da lista
  const removeItem = (index) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.selectedItem}>
      <Text>{item.quantity}x {item.name} (Tamanho: {item.size})</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={item.quantity.toString()}
        onChangeText={(value) => {
          const newItems = [...selectedItems];
          newItems[index].quantity = value;
          setSelectedItems(newItems);
        }}
      />
      <Button title="Remover" onPress={() => removeItem(index)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bem vindo ao nosso catálogo!</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <Text>{item.name}</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => {
                setCurrentProduct(item); // Define o produto atual no modal
                setModalVisible(true); // Abre o modal
              }}
            >
              <Text style={styles.buttonText}>Selecionar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
      <Button title="Enviar pedido via WhatsApp" onPress={() => setEditModalVisible(true)} />

      {/* Modal para selecionar tamanho e quantidade */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Selecione o tamanho e quantidade de {currentProduct?.name}</Text>

          {/* Picker para tamanho */}
          <Text style={styles.label}>Tamanho:</Text>
          <Picker
            selectedValue={selectedSize}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
          >
            {currentProduct?.sizes.map(size => (
              <Picker.Item key={size} label={size} value={size} />
            ))}
          </Picker>

          {/* Input para quantidade */}
          <Text style={styles.label}>Quantidade:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />

          <Button title="Confirmar" onPress={confirmSelection} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* Modal para editar pedidos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Revise seu pedido</Text>
          <FlatList
            data={selectedItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Enviar via WhatsApp" onPress={sendMessage} />
          <Button title="Fechar" onPress={() => setEditModalVisible(false)} />
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

// Definição de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 35,
  },
  headerText: {
    fontSize: 30,
    marginBottom: 20,
  },
  productItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 170,
    height: 170,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 20,
    color: "green"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: 'black',
    fontSize: 16,
  },
  selectedItem: {
    marginBottom: 10,
  },
});
