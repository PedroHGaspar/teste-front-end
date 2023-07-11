$(document).ready(function () {
    var token = '';

    $('#login-form').submit(function (event) {
        event.preventDefault();

        var user = $('#user').val();
        var pass = $('#pass').val();

        $.ajax({
            url: 'data.json',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                if (user === 'teste' && pass === 'ug235235') {
                    token = response.TOKEN;
                    $('#login-message').text('Usuário autenticado com sucesso');
                    $('#login-form').hide();
                    $('#token-message').html('<strong>Token:</strong> ' + token);
                    console.log(token);
                    listarItens(response);
                } else {
                    alert('Usuário ou senha inválidos');
                }
            },
            error: function () {
                alert('Ocorreu um erro na requisição.');
            }
        });
    });

    function listarItens(data) {
        if (token !== '') {
            var items = data.DADOS.VALORES;
            $('#item-table-body').empty();
            items.forEach(function (item) {
                var row = $('<tr>').addClass('my-row');
                var idCell = $('<td>').addClass('my-cell').text(item.id);
                var nomeCell = $('<td>').addClass('my-cell').text(item.nome);
                var nomeFantasiaCell = $('<td>').addClass('my-cell').text(item.nome_fantasia);
                var cnpjCell = $('<td>').addClass('my-cell').text(item.cnpj);
                var statusCell = $('<td>').addClass('my-cell').text(item.status);
                var actionsCell = $('<td>').addClass('my-cell');
                var editButton = $('<button>').text('✎').addClass('edit-button');
                var deleteButton = $('<button>').text('🗑').addClass('delete-button');

                editButton.data('item', item);
                deleteButton.data('item', item);

                actionsCell.append(editButton, deleteButton);
                row.append(idCell, nomeCell, nomeFantasiaCell, cnpjCell, statusCell, actionsCell);
                $('#item-table-body').append(row);
            });
            $('#table-container').show();
        } else {
            alert('Faça o login para visualizar a lista de itens.');
        }
    }

    $(document).on('click', '.edit-button', function () {
        if (token !== '') {
            var item = $(this).data('item');
            $('#edit-modal').show();
            $('#edit-id').val(item.id);
            $('#edit-nome').val(item.nome);
            $('#edit-nome-fantasia').val(item.nome_fantasia);
            $('#edit-cnpj').val(item.cnpj);
            $('#edit-status').val(item.status);
        } else {
            alert('Faça o login para editar o item.');
        }
    });

    $('#update-button').click(function () {
        if (token !== '') {
            var itemId = $('#edit-id').val();
            var updatedData = {
                id: itemId,
                nome: $('#edit-nome').val(),
                nome_fantasia: $('#edit-nome-fantasia').val(),
                cnpj: $('#edit-cnpj').val(),
                status: $('#edit-status').val()
            };
            $.ajax({
                url: 'data.json',
                method: 'PUT',
                data: { id: itemId, data: updatedData },
                success: function () {
                    alert('Item atualizado com sucesso.');
                    $('#edit-modal').hide();
                    listarItens();
                },
                error: function () {
                    alert('Ocorreu um erro na requisição.');
                }
            });
        } else {
            alert('Faça o login para editar o item.');
        }
    });

    $(document).on('click', '.delete-button', function () {
        if (token !== '') {
            var item = $(this).data('item');
            if (confirm('Deseja realmente excluir o item?')) {
                $.ajax({
                    url: 'data.json',
                    method: 'DELETE',
                    data: { id: item.id },
                    success: function () {
                        alert('Item excluído com sucesso.');
                        listarItens();
                    },
                    error: function () {
                        alert('Ocorreu um erro na requisição.');
                    }
                });
            }
        } else {
            alert('Faça o login para excluir o item.');
        }
    });

    $(document).on('click', '.edit-button', function () {
        if (token !== '') {
            $('#item-table').addClass('blur-table');
        }
    });

    $('.close').click(function () {
        $('#item-table').removeClass('blur-table');
        $('#edit-modal').hide();
    });
});





// document.addEventListener('DOMContentLoaded', function () {
//     var darkModeToggle = document.getElementById('dark-mode');
//     var body = document.body;
//     var imgLogo = document.querySelector('.imgLogo');
//     function setButtonContent() {
//         if (body.classList.contains('darkMode')) {
//             darkModeToggle.textContent = '🌑';
//             imgLogo.style.filter = 'invert(1%)';
//         } else {
//             darkModeToggle.textContent = '☀️';
//             imgLogo.style.filter = 'invert(100%)';
//         }
//     }
//     setButtonContent();
//     darkModeToggle.addEventListener('click', function () {
//         body.classList.toggle('darkMode');
//         setButtonContent();
//     });
// });
