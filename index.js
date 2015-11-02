var ddp = new DDP({
  endpoint: 'ws://localhost:3000/websocket',
  SocketConstructor: WebSocket
});

ddp.on('connected', function() {
  console.log('meteor connected');
});

ddp.on('failed', function() {
  console.log('meteor connection failed');
});

ddp.sub('my-actions');
ddp.on('added', function(data) {
  console.log('data', data);

  if (data.collection === 'actions') {
    switch (data.fields.event) {
      case 'action:show_alert':
        alert('received message: ' + data.fields.details.message);
        console.info('your number is ', data.fields.details.number);

        ddp.method('actions/show_alert', [data.id], function(err, res) {
          if (err) {
            console.error('error in actions/show_alert', err);
          }
          else {
            console.log('done');
          }
        });
        break;
    }
  }
});

(function() {
    $('[data-button]').click(function(evt) {
      evt.preventDefault();

      var num = $(evt.currentTarget).data('button');

      ddp.method('buttons/add_number', [num], function(err, res) {
        if (err) {
          console.error('error in buttons/add_number', err);
        }
        else {
          console.log('result', res);
        }
      });
    });
})();
