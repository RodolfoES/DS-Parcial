const fastify = require('fastify')({ logger: true });
   const fastifyMultipart = require('@fastify/multipart');
   const fs = require('fs');
   const path = require('path');
   const util = require('util');
   const pipeline = util.promisify(require('stream').pipeline);
   const { IncidentRepository } = require('./database');

   // Habilitar CORS y Multipart
   fastify.register(require('@fastify/cors'), { 
     origin: '*',
     methods: ['GET', 'POST', 'PATCH', 'DELETE']
   });
   fastify.register(fastifyMultipart);

   // Crear carpeta uploads si no existe
   const UPLOADS_DIR = path.join(__dirname, 'uploads');
   if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

   // Habilitar la visualización de imágenes (NUEVO)
   fastify.register(require('@fastify/static'), {
     root: UPLOADS_DIR,
     prefix: '/uploads/', 
   });

   // Crear reporte
   fastify.post('/api/incidents', async (req, reply) => {
     const parts = req.parts();
     let title, category, description, mediaUrl;

     for await (const part of parts) {
       if (part.type === 'file') {
         const filename = `${Date.now()}-${part.filename}`;
         await pipeline(part.file, fs.createWriteStream(path.join(UPLOADS_DIR, filename)));
         mediaUrl = `/uploads/${filename}`;
       } else {
         if (part.fieldname === 'title') title = part.value;
         if (part.fieldname === 'category') category = part.value;
         if (part.fieldname === 'description') description = part.value;
       }
     }
     const newIncident = await IncidentRepository.create({ title, category, description, mediaUrl });
     reply.code(201).send({ message: 'OK', data: newIncident });
   });

   // Ver reportes
   fastify.get('/api/incidents', async (req, reply) => {
     const incidents = await IncidentRepository.getAll();
     reply.send({ data: incidents });
   });

   // Actualizar estado
   fastify.patch('/api/incidents/:id/status', async (req, reply) => {
     await IncidentRepository.updateStatus(req.params.id, req.body.status);
     reply.send({ message: 'Estado actualizado' });
   });

   // Borrar reporte (NUEVO)
   fastify.delete('/api/incidents/:id', async (req, reply) => {
     await IncidentRepository.delete(req.params.id);
     reply.send({ message: 'Incidencia eliminada' });
   });

   fastify.listen({ port: 3000 }, (err) => {
     if (err) process.exit(1);
     console.log('Servidor corriendo en http://localhost:3000');
   });