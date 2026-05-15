2. Casos de Prueba Realizadas 
- CP-01 (HU-01): Enviar un POST a "/api/incidents" con un formulario multipart/form-data que incluya texto y un archivo .jpg. Resultado Esperado: Respuesta 201 Created y guardado exitoso.

- CP-02 (HU-02): Enviar un GET a "/api/incidents". Resultado Esperado: Respuesta 200 OK con un arreglo de objetos JSON.

- CP-03 (HU-03): Enviar un PATCH a "/api/incidents/1/status" con un body {"status": "Resuelto"}. Resultado Esperado: Respuesta 200 OK, actualización en BD.