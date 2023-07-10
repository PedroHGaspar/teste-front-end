$(document).ready(function () {
    var token = '';

    $('#login-form').submit(function (event) {
        event.preventDefault();

        var user = $('#user').val();
        var pass = $('#pass').val();

        $.ajax({
            url: 'https://somma.dirai.com.br/avaliacao.php?login',
            method: 'POST',
            data: { user: user, pass: pass },
            success: function (response) {
                if (response.TYPE === 'SUCCESS') {
                    token = response.TOKEN;
                    $('#login-message').text('Usuário autenticado com sucesso');
                    $('#login-form').hide();
                    $('#token-message').html('<strong>Token:</strong> ' + token);
                    console.log(token);

                    listarItens();
                } else {
                    alert('Usuário ou senha inválidos');
                }
            }
        });
    });

    function listarItens() {
        if (token !== '') {
            $.ajax({
                url: 'https://somma.dirai.com.br/avaliacao.php?list',
                method: 'GET',
                success: function (response) {
                    if (response.TYPE === 'SUCCESS') {
                        var items = response.DADOS.VALORES;

                        items.forEach(function (item) {
                            var listItem = $('<li>').text(
                                'ID: ' + item.id +
                                ', Nome: ' + item.nome +
                                ', Nome Fantasia: ' + item.nome_fantasia +
                                ', CNPJ: ' + item.cnpj +
                                ', Status: ' + item.status
                            );
                            $('#list-container').append(listItem);
                        });
                    } else {
                        alert('Falha ao obter a lista de itens.');
                    }
                },
                error: function () {
                    alert('Ocorreu um erro na requisição.');
                }
            });
        } else {
            alert('Faça o login para visualizar a lista de itens.');
        }
    }

});

document.addEventListener('DOMContentLoaded', function () {
    var darkModeToggle = document.getElementById('dark-mode');
    var body = document.body;
    var imgLogo = document.querySelector('.imgLogo');
    function setButtonContent() {
        if (body.classList.contains('darkMode')) {
            darkModeToggle.textContent = '🌑';
            imgLogo.style.filter = 'invert(1%)';
        } else {
            darkModeToggle.textContent = '☀️';
            imgLogo.style.filter = 'invert(100%)';
        }
    }
    setButtonContent();
    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('darkMode');
        setButtonContent();
    });
});
