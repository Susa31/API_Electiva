# BITÁCORA — Susana Sánchez (Susa31)

## 2026-09-16 

Investigué las APIs sugeridas en el enunciado buscando una que no exigiera clave, no se repitiera con otro grupo y tuviera más de 20 registros. Elegimos TheMealDB con mi equipo 

## 2026-09-17
y nos dividimos los requisitos funcionales (RF-01 a RF-06) entre los tres integrantes.

me trabé No tenía claro cómo debía organizarse la estructura de carpetas del proyecto (types, services, components).

Revisé la estructura mínima que exige el enunciado y el material de la última clase, y armé la base del proyecto con Vite + react-ts siguiendo esa estructura.

Cree el repositorio y lance el primer Commits:"Primer commit: Subiendo el proyecto"

## 2026-09-18
Luego ya empece a implementar el listado inicial de comidas (RF-01): definí las interfaces `Meal` y `MealResponse` en `types/api.ts`, el servicio `listMeals()` en `services/api.ts`, y el componente `TheMealApp.tsx` que consume esos datos y los muestra con `ListElement.tsx`. También agregué los estilos base en `style.css`.

- Error de TypeScript al declarar `useState([])` sin tipo genérico (`Argument of type 'void' is not assignable to parameter of type 'SetStateAction<never[]>'`).
- Error de import/export inconsistente entre `TheMealApp.tsx` y `main.tsx` (`Module has no exported member 'TheMealApp'`).
- Los estilos no se aplicaban visualmente (título sin centrar, tarjetas en columna en vez de grid).

Tipé explícitamente el estado como `useState<Meal[]>([])`; unifiqué el estilo de exportación a named export en ambos archivos; confirmé que faltaba el `import "./styles/style.css"` en el componente.

Commits:"feat: definir interfaces Meal y MealResponse", "feat: implementar listado inicial de comidas con estilos"]

## 2026-09-19
Implementé la búsqueda (RF-03): creé `BarraBusqueda.tsx` y conecté el estado `search` con un filtro sobre `meals` en `TheMealApp.tsx`.

Luego me dio errores como:
- El filtro no encontraba resultados al buscar "buñuelos", aunque sí funcionaba con palabras como "arroz".
- Tuve problemas con Git: hice commits en la rama equivocada (`main` en vez de mi rama feature) y no había subido mis ramas al repositorio remoto, por lo que no aparecían en GitHub.

Luego me di cuenta que era un problema de traducción automática del navegador, no del dato de la API en sí. En Git, verifiqué con `git branch -vv` que mis ramas no tenían tracking remoto y las subí con `git push -u origin <rama>`.

commit de feature/rf03-busqueda]