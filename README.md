# Question API Service

This is a backend service that provides API endpoints for managing questions.

## Development

1. Clone the repository

### Frontend
1. Install dependencies
```sh
cd portal
pnpm install
```
2. Run the server
```sh
pnpm dev
```

### Backend

1. Install dependencies
```sh
cd server      
virtualenv .venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Run the server
```sh
fastapi dev
```

### Docker

```sh
docker compose up -d
```

### Database

```sh
psql postgres

CREATE DATABASE db;
```

### Serve

The frontend for the admin portal is served at admin.localhost:port and client is served at client.localhost:port.
The backend is served at localhost:8000. The docs are served at localhost:8000/docs.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
