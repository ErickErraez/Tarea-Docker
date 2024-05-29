# Image Analyzer

Este proyecto es una aplicación que utiliza Docker para analizar imágenes.

## Requisitos

Asegúrate de tener instalado Docker en tu sistema. Puedes descargarlo e instalarlo desde [Docker](https://www.docker.com/get-started).

## Construcción de la imagen Docker

Para construir la imagen Docker del proyecto, utiliza el siguiente comando:

```sh
docker build -t image-analyzer .
```

## Levantar la imagen Docker

Para levantar la imagen Docker del proyecto, utiliza el siguiente comando:


```sh
docker run -p 3000:3000 image-analyzer 
```