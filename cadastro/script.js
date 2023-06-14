const apiUrl = 'http://localhost:8080/clientes';

// Função para enviar os dados do formulário para a API
async function cadastrarCliente(event) {
  event.preventDefault();

  const form = document.getElementById('cadastroClienteForm');
  const cliente = {
    nome: form.nome.value,
    email: form.email.value,
    etnia: form.etnia.value,
    genero: form.genero.value,
    endereco: {
      cep: form.cep.value
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente)
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar cliente');
    }

    const data = await response.json();
    console.log('Cliente cadastrado:', data);
    form.reset();
    exibirClientes(); // Atualiza a lista de clientes
  } catch (error) {
    console.error(error);
  }
}

async function exibirClientes() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }
    const data = await response.json();
    const clientesList = document.getElementById('clientesList');
    clientesList.innerHTML = ''; // Limpa a lista de clientes

    data.forEach(cliente => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${cliente.nome} (${cliente.email})</strong><br>
        Etnia: ${cliente.etnia}<br>
        Gênero: ${cliente.genero}<br>
        CEP: ${cliente.endereco.cep}<br>
      `;
      clientesList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
  }
}


const form = document.getElementById('cadastroClienteForm');
form.addEventListener('submit', cadastrarCliente);

