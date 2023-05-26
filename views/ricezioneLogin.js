$(document).ready(function() {
    // Gestisci l'invio del form
    $('#login-form').submit(function(event) {
      event.preventDefault(); // Previeni l'invio del form
  
      // Ottieni i valori dei campi di input
      var email = $('#email').val();
      var password = $('#password').val();
  
      // Crea un oggetto contenente i dati da inviare al backend
      var data = {
        email: email,
        password: password
      };
  
      // Esegui una richiesta AJAX al tuo endpoint del backend
      $.ajax({
        url: '/login', // Inserisci l'URL del tuo endpoint del backend
        type: 'POST',
        data: data,
        success: function(response) {
          // La richiesta è stata completata con successo
          // Puoi gestire la risposta del backend qui
          console.log(response);
        },
        error: function(error) {
          // Si è verificato un errore durante la richiesta
          console.log(error);
        }
      });
    });
  });