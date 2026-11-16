# Automatic MSJ

## Problema
Problema concreto: En mi institución ocurre un problema de comunicación entre docente y alumno debido a un
sistema de mensajería deficiente con tiempos de respuesta prolongados
Personas beneficiarias: Afectaría de manera positiva a cada uno de los estudiantes generando un medio de comunicación organizado y más cercano con los profesores, adecuándose a los tiempos de disponibilidad de los docentes y alumnos.
Evidencia inicial: En mi experiencia suele ocurrir que los docentes no tienen horarios claros para contestar los mensajes enviados a las plataformas institucionales como Esemtia o Moodle. El problema principal es que no se evidencia si el mensaje ha sido enviado y receptado por el docente, ni si el docente está activo para responder en ese momento.

## Solución
Descripción de la solución: Crearé una aplicación móvil que funcione como un chat entre docentes y alumnos en la cual se puedan subir archivos para que un docente pueda revisarlo en el tiempo en el que este esté activo. Funcionando por medio de tickets y colas de espera dependiendo cuántas personas estén queriendo enviar un mensaje al mismo tiempo.
Funcionalidades principales: 1. Gestión de tickets — El estudiante podrá crear una consulta enviando su mensaje o archivo adjunto, quedando asignado a una cola de espera priorizada.
2. Estado y disponibilidad — El estudiante podrá verificar en tiempo real si su ticket ha sido receptado, leído o si el docente está activo para responder.
3. Panel docente — El docente podrá visualizar la cola de tickets pendientes, cambiar su estado de disponibilidad y responder o cerrar las consultas.
Recorrido de uso: 1. El estudiante ingresa a la aplicación y selecciona al docente con quien necesita comunicarse. 2. Redacta su consulta, adjunta el archivo si es necesario y envía el mensaje generando un ticket de atención. 3. El sistema ubica el ticket en la cola del docente y muestra al estudiante el estado actual (en espera, en revisión o respondido) junto con el horario de disponibilidad del profesor.
Pantallas previstas: Pantalla de Inicio / Directorio: Seleccionar al docente a consultar y visualizar su disponibilidad (activo/inactivo/horario).
Pantalla de Creación de Ticket: Redactar la consulta, seleccionar el tipo de duda y adjuntar archivos.
Pantalla de Seguimiento / Chat: Ver el estado del mensaje enviado en tiempo real y la respuesta del docente.
Diferenciación: A diferencia de los canales de comunicación tradicionales que generan incertidumbre sobre si el mensaje fue leído, esta app transforma la mensajería en un sistema transparente basado en tickets y disponibilidad activa, eliminando la sobrecarga fuera de horario y dando certeza de recepción al estudiante.
Comprobaciones: Cuando el estudiante envíe un mensaje, la app debe generar un nuevo ticket con el estado “Enviado/En espera” y mostrar su posición en la cola.
Cuando el docente active su estado a “Disponible” y responda la consulta, la app debe actualizar el estado del ticket del estudiante a “Respondido/Cerrado”.
Resumen: Quiero resolver la falta de certeza y demoras en la comunicación docente-estudiante mediante 3 una app móvil que organice la atención mediante tickets y colas de espera. La primera versión permitirá a los alumnos enviar consultas con archivos adjuntos, verificar el estado de entrega y disponibilidad del docente, y visualizar el turno de su requerimiento de forma estructurada.

## Objetivos
- Desarrollar una interfaz móvil para enviar consultas mediante tickets de atención y colas de espera.
- Implementar la visualización del estado de los mensajes y la disponibilidad en tiempo real de los docentes.
- Crear un panel de gestión para que el docente organice, responda o cierre las consultas recibidas.

## Habilidades
- React Native con Expo y TypeScript
- Componentes reutilizables y props tipadas
- Estado local y hooks (useState / custom hooks)
- Navegación entre pantallas (Expo Router)
- Estilos, temas y diseño adaptable

## Alcance inicial
Sí incluiré en el MVP: Interfaz de selección de docente y disponibilidad. Creación y envío de tickets de consulta con mensaje y simulación de archivos. Vista de seguimiento de tickets con estados (En espera / Atendido).
No incluiré todavía: Autenticación real con bases de datos . Notificaciones push avanzadas . Sistema de pagos o almacenamiento de archivos en la nube.

## Restricciones
- Riesgo y plan: Manejar la lógica del estado de los tickets y la ordenación de colas de espera dinámicas. Lo abordaré estructurando custom hooks y estados locales para simular la actualización del ticket según cambie su condición (enviado, receptado, resuelto).
