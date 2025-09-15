# TUT Market — Backend

Node.js (Express) asosidagi backend xizmati. Autentifikatsiya (JWT), fayl yuklash (Multer), ORM (Sequelize + PostgreSQL) va Swagger hujjatlari qo‘llab-quvvatlanadi.

## 1) O‘rnatish

- Talablar: Node.js 18+, npm
- Bosqichlar:
  - cd backend
  - npm install

## 2) Ishga tushirish

- Dev (nodemon):
  - npm run go
  - yoki npm run dev
- Production:
  - npm start
- Swagger (agar yoqilgan bo‘lsa):
  - http://localhost:PORT/api-docs

Tipik port: PORT

## 3) .env konfiguratsiya (backend/.env)

Quyidagi qiymatlarni loyihangizga moslang:

PORT=your_port
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
JWT_SECRET=your_secret

Eslatma:

- DATABASE_URL — PostgreSQL ulanish satri (Sequelize bilan ishlatiladi).
- CORS_ORIGIN — frontend dev server manzili (Vite uchun odatda http://localhost:5173).
- JWT_SECRET — kuchli maxfiy kalit qo‘ying.
