# Estructura de la aplicación

Este documento explica dónde editar cada parte de Automatic MSJ.

## Rutas

- `src/app/_layout.tsx`: configuración raíz de Expo Router y proveedor global.
- `src/app/index.tsx`: reexporta la pantalla inicial; se mantiene mínimo para Expo Router.
- `src/screens/MainScreen.tsx`: coordina sesión, navegación interna y pantalla activa.
- `src/screens/MainScreen.styles.ts`: estilos propios de la pantalla principal.

## Estado compartido

- `src/context/AppProvider.tsx`: sesión, disponibilidad, tickets y mensajes compartidos.
- `src/hooks/useLogin.ts`: iniciar y cerrar sesión.
- `src/hooks/useTickets.ts`: filtrar tickets del usuario y calcular colas.
- `src/hooks/useSelectChat.ts`: recordar el ticket abierto.

## Datos y tipos

- `src/data/initialData.ts`: docentes, tickets y mensajes iniciales de demostración.
- `src/types/app.ts`: contratos TypeScript usados por toda la aplicación.

## Componentes

- `src/components/Lobby/`: acceso e estructura principal.
- `src/components/Directory/`: directorio, perfil y bandeja.
- `src/components/Chat/`: creación de tickets y mensajes.
- Cada componente tiene un archivo `.styles.ts` hermano para mantener presentación separada de lógica.

## Cómo realizar cambios

- Cambiar los datos iniciales: `src/data/initialData.ts`.
- Cambiar tipos o modelos: `src/types/app.ts`.
- Cambiar operaciones globales: `src/context/AppProvider.tsx`.
- Cambiar la composición o navegación de la pantalla principal: `src/screens/MainScreen.tsx`.
- Cambiar diseño de una pantalla: su componente dentro de `src/components/`.
- Cambiar diseño sin tocar lógica: el archivo `.styles.ts` junto al componente.
- Cambiar reglas de sesión, cola o selección: el hook correspondiente dentro de `src/hooks/`.

Todos los archivos usan imports absolutos con `@/`, definidos en `tsconfig.json`, para evitar rutas relativas largas y dependencias confusas.
