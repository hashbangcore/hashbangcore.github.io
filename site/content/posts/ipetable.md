+++
title = "IPTABLES"
date = 2026-02-18
draft = true
+++

# Documentación del Comando `iptables`

## Descripción
`iptables` es una herramienta de administración de reglas de firewall para el kernel de Linux, utilizada para configurar las reglas de filtrado de paquetes en el sistema. Permite controlar el tráfico de red entrante, saliente y de reenvío.

## Sintaxis Básica
```bash
iptables [-t tabla] [comando] [opciones] [regla]
```

## Opciones Comunes

| Opción | Descripción |
|--------|-------------|
| `-t tabla` | Especifica la tabla a usar (`filter`, `nat`, `mangle`, `raw`). Por defecto es `filter`. |
| `-A` | Añade una regla al final de la cadena. |
| `-I` | Inserta una regla en una posición específica. |
| `-D` | Elimina una regla. |
| `-L` | Lista las reglas de una cadena. |
| `-F` | Borra todas las reglas de una cadena. |
| `-P` | Establece la política por defecto de una cadena. |
| `-j` | Especifica la acción a tomar (`ACCEPT`, `DROP`, `REJECT`, etc.). |
| `-p` | Especifica el protocolo (`tcp`, `udp`, `icmp`). |
| `--dport` | Puerto de destino. |
| `--sport` | Puerto de origen. |
| `-s` | Dirección IP de origen. |
| `-d` | Dirección IP de destino. |

## Ejemplos de Uso

### 1. Listar reglas de la tabla `filter`
```bash
iptables -L
```

### 2. Bloquear tráfico entrante desde una IP específica
```bash
iptables -A INPUT -s 192.168.1.100 -j DROP
```

### 3. Permitir tráfico SSH (puerto 22)
```bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

### 4. Bloquear todo el tráfico entrante por defecto
```bash
iptables -P INPUT DROP
```

### 5. Permitir tráfico saliente
```bash
iptables -A OUTPUT -j ACCEPT
```

### 6. Redirigir tráfico de un puerto a otro (NAT)
```bash
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```

### 7. Eliminar todas las reglas de una cadena
```bash
iptables -F INPUT
```

## Tablas y Cadenas

### Tablas
- **filter**: Filtra paquetes (por defecto).
- **nat**: Modifica direcciones de red (NAT).
- **mangle**: Modifica paquetes (TTL, TOS).
- **raw**: Excluye paquetes de seguimiento de estado.

### Cadenas
- **INPUT**: Paquetes destinados al sistema.
- **OUTPUT**: Paquetes generados por el sistema.
- **FORWARD**: Paquetes reenviados por el sistema.
- **PREROUTING**: Paquetes antes de ser enrutados.
- **POSTROUTING**: Paquetes después de ser enrutados.

## Persistencia
Para guardar las reglas y que persistan después de reiniciar el sistema:
```bash
iptables-save > /etc/iptables/rules.v4
```

## Notas
- `iptables` es parte del paquete `iptables` en la mayoría de las distribuciones Linux.
- Para sistemas modernos, se recomienda usar `nftables` como reemplazo.

## Referencias
- Manual de `iptables`: `man iptables`
- Documentación oficial de Linux: [https://www.netfilter.org/](https://www.netfilter.org/)
