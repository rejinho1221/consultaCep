function limpa_formulario_cep() {
    // Limpa valores do formulário de CEP.
    document.getElementById('rua').innerText = "";
    document.getElementById('bairro').innerText = "";
    document.getElementById('cidade').innerText = "";
    document.getElementById('uf').innerText = "";
    document.getElementById('ibge').innerText = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        // Atualiza os campos com os valores.
        document.getElementById('rua').innerText    = conteudo.logradouro;
        document.getElementById('bairro').innerText = conteudo.bairro;
        document.getElementById('cidade').innerText = conteudo.localidade;
        document.getElementById('uf').innerText     = conteudo.uf;
        document.getElementById('ibge').innerText   = conteudo.ibge;
    } else {
        // CEP não Encontrado.
        limpa_formulario_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    // Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep != "") {
        // Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP.
        if (validacep.test(cep)) {
            // Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').innerText    = "...";
            document.getElementById('bairro').innerText = "...";
            document.getElementById('cidade').innerText = "...";
            document.getElementById('uf').innerText     = "...";
            document.getElementById('ibge').innerText   = "...";

            // Cria um elemento script para JSONP.
            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        } else {
            // CEP é inválido.
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        // CEP sem valor, limpa formulário.
        limpa_formulario_cep();
    }
}