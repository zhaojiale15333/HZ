
var sureBtn = $('#sureBtn')
var list = $('#list')

list.delegate('li', 'click', function (event) {
    event.preventDefault();
    var id = $(this).eq(0).children('.delete-btn').attr('data-index')
    $.ajax({
        type: 'get',
        url: '/delete',
        data: {
            id,
        }, success: function (result) {
            if (result.code == 200) {
                window.location.reload()
            }

        }
    })
})


sureBtn.on('click', function (event) {
    event.preventDefault();
    $.ajax({
        type: 'post',
        url: '/add',
        data: {
            text: $('#text').val(),
            sureBtn: $('#amount').val()
        }, success: function (result) {
            if (result.code == 200) {
                window.location.reload()
            }

        }
    })
})
