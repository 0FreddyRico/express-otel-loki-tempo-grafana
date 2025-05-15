# Playing with LGTM stack using a mock API SERVER using Express.js

> For now, its only Loki (for logs database) & Tempo (for tracing) with Grafana

## Guidelines

> NOTE: Ports to be free or changed before testing

**API SERVER**: `3242`

**LOKI**: `3100`

**TEMPO**: `3200, 4318, 9095`

**GRAFANA**: `3006`

<br />

### Using Docker

**Build**:

```sh
docker compose build # use --no-cache for fully fresh build
```

or

```sh
COMPOSE_BAKE=true docker compose build # using COMPOSE_BAKE=true is recommended from docker for better perf.
```

**Create Containers and Run**

```sh
docker compose up # use '-d' flag to detach the live process stream logging in terminal
```

or

```sh
# use this to build latest updates and run in one single command
docker compose up --build # use '-d' if you like to detach the loggin stream
```

**Drop All Containers**

```sh
# only drops all containers of this stack/project
docker compose down
```

or

```sh
# drops all & removes its volumes (their data storages) too
docker compose down -v # use '--remove-orphans' to remove unused and forgotten too
```

> Fun fact, just a random coding day as I managed to do it!

Author: [`gh/mahabubx7`](https://mahabubx7.netlify.app)

Thanks :+1:
