"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(new logger_middleware_1.LoggerMiddleware().use);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce API Henry | Frank GP')
        .setDescription('The Ecommerce API  <br> <br> <b>by <a href="https://frankgp.com">frankgp.com</a></b> ')
        .setVersion('2024')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map