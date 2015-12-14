/*$.ajax( {
      url: '/app',
      data: $("#form").serialize(),
      type: 'POST',
      success: function(data) {
        $('#container').append('<div>'+item.interestingField+'</div>');
    }
});
*/
$(document).ready(function() {
  $('#result').hide();
    $('#form').submit(function(e) {
        e.preventDefault();

        var $form = $(e.target);
        $.ajax({
            url: $form.attr('action'),
            type: 'POST',
            data: $form.serializeArray(),
        }).done(function ( data ) {
            if(data.error != null){
              $.jGrowl(data.error, { header: 'Error', life: 1 });
            } else {
              var link = data.Link;
              var id = data.GeneratedID;
              $('#result').show();
              $('#placeholder').text('Successfully shortend link! http://'+document.domain+"/"+id+" to easily access "+link);
            }
        })
        document.getElementById("form").reset();
    });
});
