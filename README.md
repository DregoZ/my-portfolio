# Portfolio Moderno - Angular 21

Este proyecto es un portfolio profesional diseñado para mostrar no solo mis trabajos y experiencia, sino también la implementación de arquitecturas y prácticas modernas en el ecosistema de Angular.

La aplicación ofrece una experiencia de navegación fluida en una sola página (Single Page Application) con un enfoque en el rendimiento, la accesibilidad y una estética visual impactante.

## 🚀 Características Técnicas

Este proyecto utiliza las versiones más recientes de las tecnologías core de la web para garantizar un desarrollo eficiente y un producto final de alta calidad:

- **Angular 21**: Uso intensivo de las últimas características del framework.
  - **Signals**: Gestión de estado reactiva y granular para un rendimiento óptimo sin relies en Zone.js innecesarios.
  - **Standalone Components**: Arquitectura moderna sin módulos (NgModules), facilitando la mantenibilidad y el lazy loading.
  - **Control Flow Sintaxis**: Uso de `@if`, `@for` y `@switch` para plantillas más limpias y eficientes.
- **Tailwind CSS 4**: Estilizado moderno utilizando la última versión de Tailwind, aprovechando las variables CSS nativas y un motor de renderizado ultra rápido.
- **Vitest**: Suite de pruebas unitarias rápida y moderna integrada en el flujo de trabajo de desarrollo.
- **Internacionalización (i18n)**: Soporte completo para múltiples idiomas (Español/Inglés).
- **Animaciones Avanzadas**: Implementación de animaciones de scroll (Intersection Observer) y fondos dinámicos.

## 📁 Estructura del Proyecto

El código sigue una estructura organizada por responsabilidades para facilitar el escalado:

- `src/app/core/`: Componentes y servicios globales que sustentan la aplicación (Navbar, Footer, interceptores).
- `src/app/features/`: Módulos de funcionalidades específicas como Home, Proyectos y Experiencia.
- `src/app/shared/`: Componentes, directivas y pipes reutilizables en toda la aplicación.
- `src/assets/data/`: Archivos JSON que centralizan la información del portfolio, facilitando las actualizaciones de contenido.

## 🛠️ Desarrollo

### Instalación de dependencias

El proyecto utiliza `pnpm` como gestor de paquetes por su velocidad y eficiencia:

```bash
pnpm install
```

### Servidor de desarrollo

Para iniciar el servidor local:

```bash
pnpm start
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar los archivos.

### Pruebas unitarias

Para ejecutar los tests con Vitest:

```bash
pnpm test
```

### Construcción para producción

Para generar los archivos de producción:

```bash
pnpm run build
```

## 📈 Gestión de Versiones

Este proyecto sigue la metodología **Semantic Versioning (SemVer)** para el control de versiones:

- **MAJOR**: Cambios significativos o rediseños de la arquitectura.
- **MINOR**: Nuevas funcionalidades o secciones.
- **PATCH**: Corrección de bugs y mejoras menores.

La versión actual se define en el archivo `package.json` y se muestra automáticamente en el pie de página de la aplicación.

---

_Desarrollado por Antón Alonso._
