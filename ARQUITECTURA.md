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


