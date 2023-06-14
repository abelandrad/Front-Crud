const apiUrl = 'http://localhost:8080/clientes';

async function exibirCliente(clienteId) {
  try {
    const response = await fetch(`${apiUrl}/${clienteId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar cliente');
    }
    const cliente = await response.json();
    const form = document.getElementById('editarClienteForm');
    form.id.value = cliente.id;
    form.nome.value = cliente.nome;
    form.email.value = cliente.email;
    form.etnia.value = cliente.etnia;
    form.genero.value = cliente.genero;
    form.cep.value = cliente.endereco.cep;
  } catch (error) {
    console.error(error);
  }
}

async function atualizarCliente(event) {
  event.preventDefault();

  const form = document.getElementById('editarClienteForm');
  const clienteId = form.id.value;
  const clienteAtualizado = {
    id: clienteId,
    nome: form.nome.value,
    email: form.email.value,
    etnia: form.etnia.value,
    genero: form.genero.value,
    endereco: {
      cep: form.cep.value
    }
  };

  try {
    const response = await fetch(`${apiUrl}/${clienteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clienteAtualizado)
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar cliente');
    }

    console.log('Cliente atualizado:', clienteAtualizado);
    form.reset();
  } catch (error) {
    console.error(error);
  }
}

const form = document.getElementById('editarClienteForm');
form.addEventListener('submit', atualizarCliente);

// Preenche o formulário com os dados do cliente ao carregar a página
const urlParams = new URLSearchParams(window.location.search);
const clienteId = urlParams.get('id');
if (clienteId) {
  exibirCliente(clienteId);
} else {
  console.error('ID do cliente não fornecido');
}