$ ->
  $('body#cart').on 'blur', 'input[id$=_qty]', (event) ->
    $(this).closest('form').submit()


  $('body#cart').on 'click', '.remove', (event) ->
    event.preventDefault()

    $(this)
      .closest('li').find('input[id$=_qty]').val(0)
      .closest('form').submit()
