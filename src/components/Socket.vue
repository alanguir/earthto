<script>
      var EventBus = new Vue();
      (function(){
        var socket = io();
        EventBus.$on('transmission', function(payload){
          socket.emit('transmission', payload);
        });
        socket.on('transmission', function(payload){
          console
          EventBus.$emit('transmission:receive', payload);
        });
        
      })();
    </script>