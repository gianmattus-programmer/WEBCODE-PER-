# Guía de Contribución para WebCode Perú

¡Gracias por tu interés en contribuir al proyecto WebCode Perú! Este documento contiene información importante para que puedas contribuir efectivamente a nuestro proyecto.

## Código de Conducta

Al participar en este proyecto, te comprometes a mantener un ambiente respetuoso y colaborativo. Esperamos que todos los colaboradores sigan estos principios:

1. Usa lenguaje inclusivo y respetuoso
2. Respeta diferentes puntos de vista y experiencias
3. Acepta críticas constructivas con gratitud
4. Enfócate en lo que es mejor para la comunidad
5. Muestra empatía hacia otros miembros de la comunidad

## ¿Cómo Puedo Contribuir?

### Reportando Bugs

- Usa el sistema de issues de GitHub
- Verifica que el bug no haya sido reportado anteriormente
- Usa la plantilla proporcionada para reportar bugs
- Incluye pasos detallados para reproducir el problema
- Incluye capturas de pantalla si es posible

### Sugiriendo Mejoras

- Usa el sistema de issues de GitHub
- Describe claramente la mejora y su propósito
- Proporciona ejemplos de cómo funcionaría

### Enviando Pull Requests

1. Asegúrate de que tu código sigue nuestras guías de estilo
2. Actualiza el README.md si es necesario
3. Actualiza la documentación si corresponde
4. El PR debe dirigirse a la rama `develop`, no a `main`

## Proceso de Desarrollo

1. Haz fork del repositorio
2. Crea una nueva rama desde `develop`:
   ```bash
   git checkout develop
   git checkout -b feature/nombre-de-tu-caracteristica
   ```
3. Realiza tus cambios y haz commits:
   ```bash
   git commit -m "Descripción clara del cambio"
   ```
4. Envía tu rama al repositorio:
   ```bash
   git push origin feature/nombre-de-tu-caracteristica
   ```
5. Abre un Pull Request hacia la rama `develop`

## Guías de Estilo

### HTML
- Usa HTML5 semántico
- Mantén la indentación consistente (2 espacios)
- Usa nombres de clase descriptivos siguiendo metodología BEM

### CSS
- Sigue las variables CSS definidas en `:root`
- Usa media queries para diseño responsive
- Mantén el orden alfabético de propiedades cuando sea posible

### JavaScript
- Usa ES6+ cuando sea posible
- Mantén las funciones cortas y con un solo propósito
- Comenta el código complejo o no obvio
- Evita variables globales

## Configuración del Entorno de Desarrollo

Para configurar tu entorno de desarrollo local:

1. Clona tu fork del repositorio
   ```bash
   git clone https://github.com/TU-USUARIO/WebCode.git
   cd WebCode
   ```

2. Configura el repositorio upstream para mantener tu fork actualizado
   ```bash
   git remote add upstream https://github.com/Gianmattus-Programmer/WebCode.git
   ```

3. Regularmente sincroniza tu fork con el repositorio principal
   ```bash
   git fetch upstream
   git checkout develop
   git merge upstream/develop
   ```

## Recursos Adicionales

- [Guía de GitHub para Contribuciones](https://docs.github.com/es/get-started/quickstart/contributing-to-projects)
- [Convenciones de Commits](https://www.conventionalcommits.org/es/v1.0.0/)

¡Gracias por contribuir a WebCode Perú!