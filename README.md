# NodeJS Micro-Service
The main goal of the microservice is to get file, scan it, detect vulnerabilities and viruses and if any found, save it in db and cloud.
Furthermore, the micro service supply crud operation for farm and turbines models.

## Configuration

### .env

```bash
PORT= # port to run on
```
mongodb connection is required:
```bash
DB_HOST=
DB_USER=
DB_PASS=
```

virus-total connection is required:
```bash
VT_API_KEY=
VT_API_URL=
```

cloudinary connection is required:
```bash
CLOUD_NAME=
CLOAD_AKI_KEY=
CLOUD_API_SECRET=
```

## Installation

```bash
git clone https://github.com/Erangolan/managment-system-service
```

```bash
npm install
```

```bash
npm run dev
```