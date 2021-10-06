// Códigos usados nas abas da página home:

// função que mostra um conteúdo e esconde os outros
function showContent(identificator) {
    // esconde todos os conteúdos
    $("#register").addClass('d-none');
    $("#login").addClass('d-none');
    // torna o conteúdo escolhido visível
    $("#" + identificator).removeClass('d-none');
}

// função para quando a página carregar, o juntar-se ser o primeiro a aparecer.
window.addEventListener('load', () => {
    document.getElementById("link-register").click();
    $("#link-register").addClass("active");
})

//função que ativa e desativa um elemento
function activeClass(active, unactive) {
    $(active).addClass("active");
    $(unactive).removeClass("active");
}

// código para mapear click do link Inicio
$(document).on("click", "#link-register", function () {
    showContent("register");
    activeClass("#link-register", "#link-login")

});

// código para mapear click do link Inicio
$(document).on("click", "#link-login", function () {
    showContent("login");
    activeClass("#link-login", "#link-register")

});

/*
//Script do gráfico da terceira dica -> Materiais Biodegradáveis:
window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Sacolinhas Convencionais  vs  Sacolinhas Biodegradáveis"
        },
        axisX: {
            interval: 1
        },
        axisY: {
            title: "Tempo de Decomposição em Anos",
            includeZero: true,
        },
        data: [{

            type: "bar",
            toolTipContent: "<img src=\"../imagens/\"{url}\"\" style=\"width:40px; height:20px;\"> <b>{label}</b><br>Tempo: {y} anos<br>",
            dataPoints: [{
                label: "Biodegradáveis",
                y: 20,
                url: "sacola-biodegradavel-grafico.jpg",
                color: "rgb(81, 189, 72)"
            }, {
                label: "Convencionais",
                y: 100,
                url: "Sacolinha-plástica-grafico.jpg",
                color: "rgb(209, 107, 40)"
            },

            ]
        }]
    });
    chart.render();
}
*/
//querySelector vai ser ligado ao contexto e ao escopo do document
/*const $ = document.querySelector.bind(document)

function TabNavigation() {
    const html = {
        links: [...$('.tab-links').children],
        links: [...$('.tab-content').children],
        openTab: $('[data-open]')
    }

    function hideAllTabContent() {
        // coloca-se o contents como uma array para que o forEach funcione
        const contents = [...html.contents.children] //children é uma html colection
        contents.forEach(section => {
            section.style.display = "none"
        })
    }
    // vai remover todas as classes ativas quando eu clicar em alguma  
    function removeAllActiveClass() {
        html.links.forEach(tab => {
            tab.className = tab.className.replace(" active", "")
        })
    }

    function showCurrentTab(id) {
        const tabContent = $('#' + id)
        tabContent.style.display = "block"
    }

    function selectTab(event) {
        hideAllTabContent()
        removeAllActiveClass()

        const target = event.currentTarget
        showCurrentTab(target.dataset.id)

        target.className += " active"

    }

    function listenForChange() {
        html.links.forEach(tab => {
            tab.addEventListener('click', selectTab)
        })
    }

    function init() {
        hideAllTabContent()
        listenForChange()

        html.openTab.click()
    }

    return {
        init
    }
}

window.addEventListener('load', () => {
    const TabNavigation = TabNavigation()
    TabNavigation.init()
})


*/


/* acho que é inutil, serve pra listar e sair do pop up (a gente nem tem pop up)

$(function () { // quando o documento estiver pronto/carregado 

    // função para exibir pessoas na tabela 
    function exibir_usuarios() {
        $.ajax({
            url: 'http://localhost:5000/listar_usuarios',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json 
            success: listar, // chama a função listar para processar o resultado 
            error: function () {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar(usuarios) {
            // esvaziar o corpo da tabela 
            $('#corpoTabelaUsuarios').empty();
            // tornar a tabela visível 
            mostrar_conteudo("tabelaUsuarios");
            // percorrer a lista de pessoas retornadas; 
            for (var i in usuarios) { //i vale a posição no vetor 
                lin = '<tr>' + // elabora linha com os dados da pessoa
                    '<td>' + usuarios[i].nome + '</td>' +
                    '<td>' + usuarios[i].email + '</td>' +
                    '<td>' + usuarios[i].senha + '</td>' +
                    '</tr>';
                // adiciona a linha no corpo da tabela 
                $('#corpoTabelaPessoas').append(lin);
            }
        }

        function mostrar_conteudo(identificador) {
            // esconde todos os conteúdos 
            $("#tabelaUsuarios").addClass('invisible');
            $("#conteudoInicial").addClass('invisible');
            // torna o conteúdo escolhido visível 
            $("#" + identificador).removeClass('invisible');
        }

*/

// código para mapear click do botão incluir pessoa 
$(document).on("click", "#btIncluirUsuario", function () {
    //pegar dados da tela 
    nome = $("#campoNome").val();
    email = $("#campoEmail").val();
    senha = $("#campoSenha").val();
    // preparar dados no formato json 
    var dados = JSON.stringify({ nome: nome, email: email, senha: senha });
    // fazer requisição para o back-end 
    $.ajax({
        url: 'http://localhost:5000/incluir_usuario',
        type: 'POST',
        dataType: 'json', // os dados são recebidos no formato json 
        contentType: 'application/ json', // tipo dos dados enviados 
        data: dados, // estes são os dados enviados 
        success: usuarioIncluido, // chama a função listar para processar o resultado 
        error: erroAoIncluir
    });

    function usuarioIncluido(retorno) {
        if (retorno.resultado == "ok") { // a operação deu certo? 
            // informar resultado de sucesso 
            alert("Usuário incluído com sucesso!");
            // limpar os campos 
            $("#campoNome").val("");
            $("#campoEmail").val("");
            $("#campoSenha").val("");
        } else {
            // informar mensagem de erro 
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }
    function erroAoIncluir(retorno) {
        // informar mensagem de erro 
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }
});