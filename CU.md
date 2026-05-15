c) Historias de Usuario :

c.1) HU-01: Reportar Incidencia con Multimedia (Imágenes/Video/Audio)

- Como ciudadano,quiero registrar una incidencia en la vía pública adjuntando una foto, video o nota de voz,
para que las autoridades tengan evidencia visual y de audio del problema (bache, basura, etc.).

- Criterios de Aceptación: El sistema debe permitir subir archivos multimedia, guardar la ruta en la base de datos y retornar un código HTTP 201.

c.2) HU-02: Visualizar Incidencias

- Como ciudadano,quiero ver una lista de todas las incidencias reportadas en mi distrito,
para que pueda saber qué problemas ya han sido notificados.

- Criterios de Aceptación: La API debe devolver un array en formato JSON con los datos y el estado de la incidencia.

c.3) HU-03: Actualizar Estado de la Incidencia

- Como administrador, quiero cambiar el estado de una incidencia un ejemplo claro es pasar de "Pendiente" a "Resuelto",
para que los ciudadanos sepan que el problema ha sido solucionado.

- Criterios de Aceptación: El sistema debe permitir actualizar el campo status a través de un método PATCH/PUT.

