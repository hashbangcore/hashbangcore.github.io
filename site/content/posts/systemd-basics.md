+++
title = "Systemd en práctica: manejo básico de servicios"
date = 2026-02-18
draft = true
+++

Systemd es el sistema de inicio más común en Linux modernos. Controla servicios, timers y dependencias. Aquí tienes una guía breve para el trabajo diario.

---

## Ver el estado de un servicio

```bash
systemctl status nginx
```

---

## Iniciar, detener y reiniciar

```bash
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
```

---

## Habilitar al arranque

```bash
sudo systemctl enable nginx
sudo systemctl disable nginx
```

---

## Ver logs con journalctl

```bash
journalctl -u nginx
journalctl -u nginx -f
```

---

## Listar servicios

```bash
systemctl list-units --type=service
systemctl list-unit-files --type=service
```

---

## Crear un servicio sencillo

Ejemplo mínimo de unidad en `/etc/systemd/system/miapp.service`:

```ini
[Unit]
Description=Mi app
After=network.target

[Service]
ExecStart=/usr/local/bin/miapp
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Luego recarga y habilita:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now miapp
```

---

## Cierre

Si dominas `systemctl` y `journalctl`, ya cubres el 80% del trabajo con systemd.
