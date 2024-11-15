```bash
npm i -g @nestjs/cli
nest -v
nest new .

npm install dotenv
npm install @nestjs/typeorm @nestjs/config typeorm pg

# ========== hw5 migration ==========

npm run migration:create src/migrations/prueba
npm run build
npm run migration:run

npm run build
npm run migration:generate src/migrations/initial
npm run build
npm run migration:run

npm run start:dev

# ========== hw6 pipes ==========
npm i class-validator class-transformer


```
