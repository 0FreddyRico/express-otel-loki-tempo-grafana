# Express OpenTelemetry Loki Tempo Grafana Stack 🚀

![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white) ![Grafana](https://img.shields.io/badge/Grafana-FF1F20?style=flat&logo=grafana&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-8CC84B?style=flat&logo=node.js&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

Welcome to the **Express OpenTelemetry Loki Tempo Grafana Stack** repository! This project demonstrates how to set up a mock API server using Express.js while integrating various tools from the LGTM stack. 

## Overview

This repository aims to showcase the power of logging and tracing in Node.js applications. By using OpenTelemetry, Loki, Tempo, and Grafana, you can gain insights into your application’s performance and behavior. The setup is designed for developers looking to explore observability in their applications with a focus on simplicity and clarity.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Observability Stack](#observability-stack)
- [Contributing](#contributing)
- [License](#license)
- [Releases](#releases)

## Getting Started

To get started with this project, you can download the latest release from the [Releases](https://github.com/0FreddyRico/express-otel-loki-tempo-grafana/releases) section. Make sure to execute the downloaded files to set up the environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 14 or higher.
- **Docker**: For containerization.
- **Docker Compose**: To manage multi-container Docker applications.

You can check your installations by running:

```bash
node -v
docker -v
docker-compose -v
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/0FreddyRico/express-otel-loki-tempo-grafana.git
   cd express-otel-loki-tempo-grafana
   ```

2. **Install dependencies**:

   Run the following command to install the required packages:

   ```bash
   npm install
   ```

3. **Set up Docker containers**:

   Use Docker Compose to set up the services. Run:

   ```bash
   docker-compose up -d
   ```

   This command starts all necessary services in the background.

## Usage

Once the setup is complete, you can start the API server:

```bash
npm start
```

Visit `http://localhost:3000` to access the mock API. You can interact with the API endpoints to see how logging and tracing work in real-time.

### Example Endpoints

- **GET /api/items**: Fetches a list of items.
- **POST /api/items**: Creates a new item.

You can explore the logging and tracing capabilities by making requests to these endpoints.

## Observability Stack

### OpenTelemetry

OpenTelemetry provides a framework for observability. It collects metrics, logs, and traces from your application. This repository uses OpenTelemetry to monitor the Express.js application effectively.

### Loki

Loki is a log aggregation system designed for efficiency. It integrates seamlessly with Grafana, allowing you to visualize logs alongside your metrics and traces.

### Tempo

Tempo is a distributed tracing backend. It helps you analyze the performance of your services by providing trace data. This repository integrates Tempo to show how traces are captured and visualized.

### Grafana

Grafana is a powerful visualization tool. It allows you to create dashboards to monitor your application's performance. This project includes Grafana configurations to display metrics, logs, and traces.

## Contributing

We welcome contributions! If you want to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your branch.
5. Create a pull request.

Please ensure your code adheres to the existing style and includes tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

To find the latest releases, visit the [Releases](https://github.com/0FreddyRico/express-otel-loki-tempo-grafana/releases) section. Download the appropriate files and execute them to set up your environment.

---

Thank you for checking out the **Express OpenTelemetry Loki Tempo Grafana Stack**! Enjoy exploring the world of observability with this stack. If you have any questions or feedback, feel free to reach out.