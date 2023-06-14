const apiUrl = 'http://localhost:8080/clientes';

    async function exibirClientes() {
      const clientesBody = document.getElementById('clientesBody');
      clientesBody.innerHTML = '';

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erro ao buscar clientes');
        }
        const clientes = await response.json();

        clientes.forEach(cliente => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.etnia}</td>
            <td>${cliente.genero}</td>
            <td>${cliente.endereco.cep}</td>
            <td class="actions">
              <button onclick="editarCliente('${cliente.id}')">Editar</button>
              <button onclick="excluirCliente('${cliente.id}')">Excluir</button>
            </td>
          `;
          clientesBody.appendChild(row);
        });
      } catch (error) {
        console.error(error);
      }
    }

    async function editarCliente(clienteId) {
      // Redirecionar para a página de edição com o ID do cliente na query string
      window.location.href = `editar_cliente.html?id=${clienteId}`;
    }

    async function excluirCliente(clienteId) {
      try {
        const response = await fetch(`${apiUrl}/${clienteId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir cliente');
        }

        console.log('Cliente excluído');
        exibirClientes();
      } catch (error) {
        console.error(error);
      }
    }

    // Exibe os clientes cadastrados ao carregar a página
    exibirClientes();