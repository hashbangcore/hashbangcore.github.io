+++
title = "Expansión en tmux: guía clara y práctica"
date = 2026-02-18
draft = true
+++

La expansión en tmux es el proceso por el cual el multiplexor **transforma** lo que escribes antes de ejecutar el comando. Entenderla ayuda a evitar sorpresas, a escribir configuraciones más seguras y a leer mejor lo que hace el sistema.

> Idea clave: tmux no ejecuta exactamente el texto que escribes; primero lo **expande**.

---

## Orden de expansiones (resumen)

tmux aplica expansiones en un orden concreto. El detalle fino importa, pero este mapa mental ayuda:

1. **Expansión de variables** (`$var`).
2. **Expansión de comandos** (`$(cmd)`).
3. **Expansión de formatos** (`#{variable}`).
4. **Eliminación de comillas** (quote removal).

---

## 1) Expansión de variables

tmux reemplaza variables por su valor en el entorno global o de sesión.

```bash
set -g @mi_variable "valor"
display-message "#{@mi_variable}"
```

---

## 2) Expansión de comandos

Ejecuta un comando y reemplaza por su salida.

```bash
display-message "Hoy es: $(date +%F)"
```

---

## 3) Expansión de formatos

tmux permite usar formatos especiales para mostrar información dinámica.

```bash
set -g status-left "#{session_name} | #{window_index}:#{pane_index}"
```

---

## Citas y comillas: la regla de oro

- **Comillas dobles**: permiten expansión (`"#{variable}"`, `"$(cmd)"`).
- **Comillas simples**: no permiten expansión (`'#{variable}'` es literal).

---

## Ejemplos típicos

```bash
set -g @mi_variable "valor"
display-message "El valor es: #{@mi_variable}"
```

Esto mostrará "El valor es: valor".

---

## Tips prácticos

- **Cita variables** casi siempre: `"#{variable}"`.
- Usa `set -g` para definir variables globales.
- Prefiere `$(...)` sobre backticks `` `...` ``.

---

## Cierre

La expansión en tmux es poderosa, pero requiere disciplina. Si recuerdas el orden y citas bien tus variables, evitarás la mayoría de errores.
