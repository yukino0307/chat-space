$(function(){ 

  function buildHTML(message){
    if ( message.image ) {

      var html =
      `<div class="main-message-list__content" data-message-id=${message.id}>
        <div class="main-message-list__content__history">
          <div class="main-message-list__content__history__sender">
            ${message.user_name}
          </div>
          <div class="main-message-list__content__history__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-message-list__content__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
          <img src=${message.image} >
      </div>`
      return html;

    } else {

      var html =
      `<div class="main-message-list__content" data-message-id=${message.id}>
        <div class="main-message-list__content__history">
          <div class="main-message-list__content__history__sender">
            ${message.user_name}
          </div>
          <div class="main-message-list__content__history__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-message-list__content__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;

    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.main-message-list').append(html);
      $('form')[0].reset();
      $('.main-message-list').animate({ scrollTop: $('.main-message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })

    .always(function(){
      $(".form__submit").removeAttr("disabled");
    });

  });

  var reloadMessages = function() {

    var last_message_id = $('.main-message-list__content:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-message-list').append(insertHTML);
        $('.main-message-list').animate({ scrollTop: $('.main-message-list')[0].scrollHeight});
      }
    })

    .fail(function() {
      alert('error');
    });

  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }

});