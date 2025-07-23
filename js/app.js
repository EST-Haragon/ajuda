// Adicionar novo item à tabela
function atualizarEventosExcluir() {
    document.querySelectorAll('.excluir-item').forEach(btn => {
        btn.onclick = function() {
            this.closest('tr').remove();
        };
    });
}

document.querySelector('.adicionar-item').addEventListener('click', function() {
    const tbody = document.querySelector('table tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" placeholder="Quantidade (kg)" style="width:90px"></td>
        <td><input type="text" placeholder="Descrição"></td>
        <td><input type="text" placeholder="Código" style="width:70px"></td>
        <td><button type="button" class="excluir-item">Excluir</button></td>
    `;
    tbody.appendChild(tr);
    atualizarEventosExcluir();
});

// Função para gerar identificador único
function gerarIdUnico() {
    return 'OS-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}

// Função para gerar QR Code
function gerarQRCode(ordemId) {
    new QRious({
        element: document.querySelector('.qrcode'),
        value: ordemId,
        size: 100
    });
}

// Finalizar ordem e enviar para backend
document.querySelector('.btn-finalizar').addEventListener('click', function() {
    const cliente = document.getElementById('cliente').value;
    const emissao = document.getElementById('emissao').value;
    const entrega = document.getElementById('entrega').value;
    let itens = [];
    document.querySelectorAll('table tbody tr').forEach(tr => {
        const tds = tr.querySelectorAll('td');
        itens.push({
            quantidade: tds[0].querySelector('input') ? tds[0].querySelector('input').value : tds[0].innerText,
            descricao: tds[1].querySelector('input') ? tds[1].querySelector('input').value : tds[1].innerText,
            codigo: tds[2].querySelector('input') ? tds[2].querySelector('input').value : tds[2].innerText
        });
    });

    const ordemId = gerarIdUnico();

    fetch('http://localhost:3000/api/ordem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ordemId,
            cliente,
            emissao,
            entrega,
            itens
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            gerarQRCode(ordemId);
            alert('Ordem salva e QR Code gerado!');
        } else {
            alert('Erro ao salvar ordem!');
        }
    })
    .catch(() => alert('Erro de conexão com o servidor.'));
});

// Inicializa eventos de exclusão para itens já existentes
atualizarEventosExcluir();