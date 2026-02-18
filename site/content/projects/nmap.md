+++
title = "Documentación del comando nmap"
date = 2026-02-18
draft = true
+++

# Nmap: Herramienta de escaneo de red

## Descripción
Nmap (Network Mapper) es una herramienta de código abierto para el descubrimiento de hosts y servicios en una red. Es una de las herramientas más utilizadas en auditorías de seguridad y administración de redes.

## Sintaxis básica
```bash
nmap [Opciones] [Objetivo]
```

## Opciones comunes

### Escaneo básico
```bash
nmap [IP o rango de IPs]
```
Realiza un escaneo básico de los puertos más comunes (1-1000) en el objetivo especificado.

### Escaneo de todos los puertos
```bash
nmap -p- [IP]
```
Escanea todos los 65535 puertos TCP en el objetivo.

### Escaneo de versión de servicios
```bash
nmap -sV [IP]
```
Detecta versiones de servicios que se están ejecutando en los puertos abiertos.

### Escaneo de sistema operativo
```bash
nmap -O [IP]
```
Intenta determinar el sistema operativo del host objetivo.

### Escaneo agresivo
```bash
nmap -A [IP]
```
Realiza un escaneo agresivo que incluye detección de versión, sistema operativo, scripts de detección de vulnerabilidades y traceroute.

### Escaneo de ping
```bash
nmap -sn [IP o rango]
```
Realiza un escaneo de ping para descubrir hosts activos en la red sin escanear puertos.

### Escaneo de red completa
```bash
nmap [red]/[máscara]
```
Escanea toda la red especificada (ejemplo: 192.168.1.0/24).

## Ejemplos de uso

1. Escaneo básico de una IP:
```bash
nmap 192.168.1.1
```

2. Escaneo de todos los puertos en una IP:
```bash
nmap -p- 192.168.1.1
```

3. Escaneo con detección de versión y sistema operativo:
```bash
nmap -sV -O 192.168.1.1
```

4. Escaneo agresivo:
```bash
nmap -A 192.168.1.1
```

5. Escaneo de red completa:
```bash
nmap 192.168.1.0/24
```

## Salida y formato

Nmap puede generar diferentes formatos de salida:

```bash
nmap -oN [archivo.txt] [IP]  # Salida normal en texto
nmap -oX [archivo.xml] [IP]  # Salida en formato XML
nmap -oG [archivo.gnmap] [IP]  # Salida en formato grepable
```

## Consideraciones de seguridad

- Usar Nmap en redes donde no se tiene permiso puede ser ilegal
- Algunos escaneos pueden ser detectados por sistemas de detección de intrusos
- Nmap debe usarse con responsabilidad y ética en el contexto de pruebas de penetración autorizadas

## Recursos adicionales

- [Documentación oficial de Nmap](https://nmap.org/book/man.html)
- [Guía de comandos comunes](https://nmap.org/book/man-briefoptions.html)
- [Libro "Nmap Network Scanning"](https://nmap.org/book/)
