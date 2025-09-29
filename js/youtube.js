// Clave de API de YouTube que se usa para autenticar las solicitudes.
const apiKey = 'AIzaSyDkp_YHS3P_IPCGx9WXoA1Ts-jbVqnsrEg';

// Definimos un array que contiene los IDs de los canales de YouTube de los cuales queremos obtener videos.
// Cada ID de canal está en formato de URL de video, pero debería ser solo el ID del canal.
const channelIds = [
  'watch?v=n_8DmENPGLo&list=OLAK5uy_m8d9UfLKscxoB4xN3J2-rkzEQhLyFOB_I', // Ejemplo: Google Developers
  'watch?v=kIabmrkRQm4&list=OLAK5uy_l1KxBu7-po2n7w9fGPyZEwUxjFWf3dzSg'  // Ejemplo: Firebase
];

// Número máximo de resultados que queremos obtener por canal.
const maxResults = 2; // Puedes ajustar la cantidad por canal

// Contenedor en el DOM donde se mostrarán los videos.
const videosContainer = document.querySelector('.videos-mosaico');

// Se limpia contenido del contenedor para asegurarnos de que no haya videos duplicados.
videosContainer.innerHTML = '';

// Iteramos sobre cada ID de canal en el array channelIds.
channelIds.forEach(channelId => {
  // Realizamos una solicitud a la API de YouTube para buscar videos en el canal especificado.
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`)
    .then(response => response.json()) // Convertimos la respuesta a formato JSON.
    .then(data => {
      // Iteramos sobre cada item en los datos devueltos por la API.
      data.items.forEach(item => {
        // Verificamos si el tipo de ID es un video de YouTube.
        if (item.id.kind === 'youtube#video') {
          // Creamos un elemento iframe para incrustar el video.
          const iframe = document.createElement('iframe');
          // Establecemos la fuente del iframe con el ID del video.
          iframe.src = `https://www.youtube.com/embed/${item.id.videoId}`;
          // Configuramos el borde del iframe y permitimos pantalla completa.
          iframe.frameBorder = 0;
          iframe.allowFullscreen = true;
          // Añadimos el iframe al contenedor de videos en el DOM.
          videosContainer.appendChild(iframe);
        }
      });
    });
});
