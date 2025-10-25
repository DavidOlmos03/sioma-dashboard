# Sioma Dashboard Frontend

Este es el frontend de la aplicación Sioma Dashboard, construido con React y TypeScript. Permite a los administradores gestionar dispositivos y códigos de activación.

## Requisitos

*   Docker
*   Docker Compose
*   Node.js y npm (para desarrollo local sin Docker)

## Configuración del Backend

Este frontend está diseñado para consumir una API backend que se espera esté ejecutándose en `http://localhost:8000`. Asegúrate de que tu servicio backend esté configurado y en funcionamiento. Puedes consultar el `README-API.md` para obtener instrucciones sobre cómo configurar y ejecutar el backend.

## Ejecución del Frontend

Existen dos modos principales para ejecutar el frontend:

### 1. Modo de Desarrollo (con Docker Compose)

Este modo utiliza el servidor de desarrollo de React con recarga en vivo, ideal para el desarrollo activo.

Para iniciar el frontend en modo de desarrollo:

```bash
docker-compose up client-dev
```

La aplicación estará disponible en `http://localhost:3000`.

### 2. Modo de Producción (con Docker Compose y Nginx)

Este modo construye la aplicación React y la sirve utilizando un servidor Nginx ligero dentro de un contenedor, optimizado para rendimiento.

Para construir y iniciar el frontend en modo de producción:

```bash
docker-compose up --build client-prod
```

La aplicación estará disponible en `http://localhost:8080`.

## Estructura del Proyecto

*   `src/`: Código fuente de la aplicación React.
    *   `api/`: Configuración de Axios y la instancia para llamadas a la API.
    *   `components/`: Componentes reutilizables (ej. `DeviceList`, `CreateCodeForm`, `PrivateRoute`).
    *   `pages/`: Componentes de página (ej. `Login`, `Dashboard`).
    *   `services/`: Lógica de negocio y servicios de API (ej. `authService`, `apiService`).
*   `public/`: Archivos estáticos.
*   `Dockerfile`: Dockerfile para el entorno de desarrollo.
*   `Dockerfile.prod`: Dockerfile de múltiples etapas para el entorno de producción.
*   `nginx.conf`: Configuración de Nginx para servir la aplicación en producción.
*   `docker-compose.yml`: Orquestación de los servicios Docker (desarrollo y producción).
*   `tsconfig.json`: Configuración del compilador TypeScript.

## Credenciales de Prueba (para el mock de login)

Si el backend no está disponible y estás usando el mock de login (que ya no está activo en la versión actual, pero se mantuvo para referencia), las credenciales eran:

*   **Email**: `admin@sioma.com`
*   **Password**: `password`

**Nota**: La versión actual del frontend intenta conectarse a la API real. Asegúrate de que el backend esté funcionando para poder iniciar sesión y usar las funcionalidades.
