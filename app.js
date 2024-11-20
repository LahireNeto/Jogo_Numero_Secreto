let lista_NumerosSorteados = []; //cria uma lista para armazenar os números sorteados.
let Num_LimiteEscolha = parseInt(prompt('Qual o número limite do jogo?')); //O usuário define o número limite para o jogo.
let Num_Secreto = gerarNumeroAleatorio(); //chama a função para gerar um número aleatório para ser o Número Secreto
console.log(Num_Secreto); //Mostra o Número Secreto no console
let Num_Tentativas = 1; //Variável para armezenar o número de chutes.
mensagemInicial(); //Altera a mensagem inicial na tela.

function exibirTextoNaTela(tag, texto){ //funcão para alterar qualquer texto na tela.
    let campo = document.querySelector(tag);  //seleciona qual texto será alterado.
    campo.innerHTML = texto;  //altera o texto 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3}); //faz a leitura do texto. Tem que ter o scrip no arquivo html
} 

function mensagemInicial(){  //faz a alteração dos textos no início do jogo.
    exibirTextoNaTela ('h1', 'Jogo do Número Secreto');  
    exibirTextoNaTela ('p', 'Escolha um número entre 1 e ' + Num_LimiteEscolha + '.');  
}

function clique_Chute(){  //função para verificar se o chute está correto ou não ao clicar o botão "Chute"
    let Num_Chute = document.querySelector('input').value; //captura o valor escolhido pelo usuário
    if (Num_Chute == Num_Secreto){  //Verifica se o chute está certo
        let str_Tentativa = (Num_Tentativas > 1 ? 'tentativas' : 'tentativa');  //verifica a quantidade de tentativas e seleciona a concordância gramatical
        let textoTentativa = (`Parabéns, você descobriu o número secreto em ${Num_Tentativas} ${str_Tentativa}.`); 
        exibirTextoNaTela ('h1', 'Acertou!');
        exibirTextoNaTela ('p', textoTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');  //habilita o botão "Reiniciar Jogo"
        document.getElementById('chute').setAttribute('disabled', true);  //desabilita o botão "Chute"
    } else if (Num_Chute < 1 || Num_Chute > Num_LimiteEscolha) { //verifica se o chute está dentro dos parâmetros
        exibirTextoNaTela ('p', 'Número escolhido inválido. Escolha um número entre 1 e ' + Num_LimiteEscolha);
    } else if (Num_Chute > Num_Secreto){  //verifica se o número do chute é maior que o Número Secreto
        exibirTextoNaTela ('p', 'O número secreto é menor.');
    } else {  //verifica se o número do chute é menor que o Número Secreto
        exibirTextoNaTela ('p', 'O número secreto é maior.');
    }

    if (Num_Chute >= 1 && Num_Chute <= Num_LimiteEscolha){  //só incrementa o número de tentativas se o número chutado for válido
        Num_Tentativas++;
    }
    limparCampo(); //limpa o campo de texto
}

function gerarNumeroAleatorio () {  //função que gera um número pseudoaleatório
    let Num_Sorteado = parseInt(Math.random() * Num_LimiteEscolha + 1); //gera um número entre [0,1[, multiplica pelo limite, e adiciona 1 para garantir que seja entre 1 e o número limite
        //o parseInt pega só a parte inteira do número.
    let Num_QtdLista = lista_NumerosSorteados.length;  //variável igual ao número de elementos da lista

    if (Num_QtdLista == Num_LimiteEscolha){  //limpa a lista quando todos os números já foram sorteados
        lista_NumerosSorteados = [];
    }

    if (lista_NumerosSorteados.includes(Num_Sorteado)){  //verifica se o número gerado já foi sorteado.
        return gerarNumeroAleatorio();  //se sim, chama a função novamente para gerar um novo número aleatório.
    } else{
        lista_NumerosSorteados.push(Num_Sorteado);  //adiciona o número gerado na lista
        console.log(lista_NumerosSorteados);  //mostra no console a lista com os números já sorteados
        return Num_Sorteado;
    }
}

function limparCampo(){ //função para limpar o campo de texto 
    Num_Chute = document.querySelector('input');
    Num_Chute.value = '';
}

function clique_Novo_Jogo(){ //função para reiniciar o jogo quando o botão "Novo Jogo" for clicado
    Num_Secreto = gerarNumeroAleatorio();  //gera um Número Secreto novo 
    console.log(Num_Secreto);  //Mostra o número no console
    limparCampo();  //limpa o campo de texto
    Num_Tentativas = 1;  //reseta o número de tentativas
    mensagemInicial();  //reseta os textos da tela para os do início do jogo
    document.getElementById('reiniciar').setAttribute('disabled', true);  //desabilita o botão "Novo Jogo"
    document.getElementById('chute').removeAttribute('disabled');  //habilita o botão "Chute"
}