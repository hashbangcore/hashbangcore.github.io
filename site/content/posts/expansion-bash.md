+++
title = "Expansión en Bash: guía clara y práctica"
date = 2026-02-18
+++

La expansión en Bash es el proceso por el cual el shell **transforma** lo que escribes antes de ejecutar el comando. Entenderla ayuda a evitar sorpresas, a escribir scripts más seguros y a leer mejor lo que hace el sistema.

> Idea clave: Bash no ejecuta exactamente el texto que escribes; primero lo **expande**.

---

## Orden de expansiones (resumen)

Bash aplica expansiones en un orden concreto. El detalle fino importa, pero este mapa mental ayuda:

1. **Expansión de llaves** (`{a,b}`) y **tildes** (`~`).
2. **Parámetros, comandos y aritmética** (`$var`, `$(cmd)`, `$((1+2))`).
3. **Separación en palabras** (word splitting) y **expansión de glob** (`*`, `?`, `[]`).
4. **Eliminación de comillas** (quote removal).

---

## 1) Expansión de llaves (brace expansion)

Sirve para generar texto repetido sin escribirlo a mano.

```bash
mkdir -p proyecto/{src,tests,docs}
# crea: proyecto/src proyecto/tests proyecto/docs
```

No usa el sistema de archivos: es pura generación de texto.

---

## 2) Expansión de tildes

Convierte `~` en tu `$HOME`:

```bash
echo ~
# /home/tu_usuario
```

---

## 3) Expansión de parámetros

Reemplaza variables por su valor.

```bash
user="hash"
echo "Hola, $user"
```

También hay formas útiles:

```bash
: "${var:=valor_por_defecto}"
: "${var:?mensaje_si_falta}"
```

---

## 4) Sustitución de comandos

Ejecuta un comando y reemplaza por su salida.

```bash
echo "Hoy es: $(date +%F)"
```

---

## 5) Expansión aritmética

```bash
echo $((2 + 2 * 5))
```

---

## 6) Word splitting (separación en palabras)

Si expandes una variable **sin comillas**, Bash puede partirla por espacios.

```bash
name="ana maria"
echo $name   # imprime: ana maria (pero son 2 palabras)
```

Con comillas, se mantiene como una sola palabra:

```bash
echo "$name"
```

---

## 7) Expansión de glob (comodines)

Bash expande `*`, `?`, `[]` usando el sistema de archivos.

```bash
ls *.md
```

Si no hay coincidencias, Bash puede dejar el patrón tal cual (según `nullglob`).

---

## Citas y comillas: la regla de oro

- **Comillas dobles**: permiten expansión (`"$var"`, `"$(cmd)"`).
- **Comillas simples**: no permiten expansión (`'$var'` es literal).

---

## Ejemplos típicos

```bash
files=$(ls *.txt)
for f in $files; do
  echo "$f"
done
```

Esto falla con nombres con espacios. Mejor:

```bash
for f in *.txt; do
  echo "$f"
done
```

---

## Tips prácticos

- **Cita variables** casi siempre: `"$var"`.
- Usa `set -u` para detectar variables no definidas.
- Prefiere `$(...)` sobre backticks `` `...` ``.

---

## Cierre

La expansión en Bash es poderosa, pero requiere disciplina. Si recuerdas el orden y citas bien tus variables, evitarás la mayoría de errores.
