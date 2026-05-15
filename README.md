1. Especificación de Requisitos de Software (SRS) y Arquitectura 
Nombre del Proyecto: InciTrack (registro de incidencias en la via publica)  
a) REQUISITOS : 

- Funcionales:  
RF01 — Registrar incidencia  
El ciudadano podrá registrar una incidencia   
RF02 — Consultar incidencias  
El usuario podrá visualizar todas las incidencias registradas.    
RF03 — Cambiar estado de incidencias  
El administrador podrá cambiar el estado.  
RF04 — Adjuntar evidencia multimedia  
El sistema permitirá subir:imágenes, videos, audios

- NO funcionales:   
RNF01  
El sistema deberá responder en menos de 3 segundos.  
RNF02  
La API deberá usar formato JSON.  
La información deberá almacenarse en PostgreSQL.  
RNF04  
El sistema seguirá arquitectura REST.  
RNF05  
El backend será implementado usando Fastify.

b) Arquitectura del Sistema:

b.1)Estilo de la Arquitectura: Arquitectura en Capas basada en Cliente-Servidor.

b.2) Patrones de Diseño utilizados:

- Repository Pattern: Para abstraer la lógica de acceso a la base de datos.

- Singleton: Para la instancia de la conexión a la base de datos y la inicialización de Fastify.

- MVC (Modelo-Vista-Controlador): Adaptado a API (rutas ->controladores ->servicios ->repositorios).


c) Historias de Usuario (3 Casos requeridos):

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

2. Casos de Prueba Realizadas 
- CP-01 (HU-01): Enviar un POST a "/api/incidents" con un formulario multipart/form-data que incluya texto y un archivo .jpg. Resultado Esperado: Respuesta 201 Created y guardado exitoso.

- CP-02 (HU-02): Enviar un GET a "/api/incidents". Resultado Esperado: Respuesta 200 OK con un arreglo de objetos JSON.

- CP-03 (HU-03): Enviar un PATCH a "/api/incidents/1/status" con un body {"status": "Resuelto"}. Resultado Esperado: Respuesta 200 OK, actualización en BD.