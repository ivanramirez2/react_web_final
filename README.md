# React AdminPanel Pro

Una aplicación web profesional para la gestión de productos, construida con React y Tailwind CSS, con un enfoque en diseño responsive extremo y arquitectura limpia.

## Descripción del Proyecto

Este proyecto es una plataforma de administración que permite el control de inventario de productos. Cuenta con un sistema de autenticación completo diferenciando entre usuarios estándar y administradores.

**Características principales:**
- **Autenticación Real**: Integración con DummyJSON para login y manejo de tokens.
- **Gestión CRUD**: Listado (GET), Creación (POST), Edición (PUT) y Borrado (DELETE) de productos.
- **Diseño Ultra-Responsive**: Adaptado específicamente para 5 breakpoints clave (1920px, 990px, 767px, 510px, 480px).
- **Control de Roles**: Interfaz adaptativa que muestra herramientas administrativas solo a usuarios con rol 'admin'.
- **PWA (Progressive Web App)**: Instalable y con soporte offline mediante Service Workers y Manifest.
- **Despliegue Continuo**: Configurado con GitHub Actions para despliegue automático en GitHub Pages.
- **Versión Móvil**: Estructura de proyecto React Native incluida en `/mobile_app` para compilación en Android.
- **Notificaciones**: Feedback en tiempo real mediante `react-toastify`.
- **Estructura Profesional**: Separación clara de servicios, componentes, stores y hooks.

## Framework y Librerías

| Librería | Versión | Propósito |
| :--- | :--- | :--- |
| **React** | ^19.2.0 | Framework Principal |
| **Vite** | ^7.3.1 | Herramienta de construcción |
| **Tailwind CSS** | ^4.1.18 | Estilizado responsive |
| **Zustand** | ^5.0.11 | Gestión de estado global |
| **React Router** | ^7.13.0 | Enrutamiento SPA |
| **React Toastify** | ^11.0.5 | Notificaciones de UI |
| **React Hook Form** | ^7.71.1 | Manejo de formularios |

## Guía de Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repo.git
   cd nombre-del-repo
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## Credenciales de Prueba

Para probar las funcionalidades de administrador y usuario, puedes usar las siguientes credenciales de DummyJSON:

- **Admin/Usuario**: `emilys` / `emilyspass`
- **Nota**: Al loguear, la aplicación detectará automáticamente tu nombre (Emily) y mostrará las opciones permitidas ya que tiene rol de administrador.

## Licencia de Uso

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo, modificarlo y distribuirlo para fines educativos o profesionales.

---
Desarrollado con ❤️ para el proyecto de React.
