$(document).ready(function () {
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
                    var token = response.TOKEN;
                    $('#login-message').text('Usuário autenticado com sucesso');
                    $('#login-form').hide();
                    $('#token-message').html('<strong>Token:</strong> ' + token);
                    console.log(token)
                } else {
                    alert('Usuário ou senha inválidos');
                }
            }
        });
    });
});
