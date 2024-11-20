"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemController = void 0;
const common_1 = require("@nestjs/common");
const system_service_1 = require("./system.service");
const common_2 = require("@nestjs/common");
let SystemController = class SystemController {
    constructor(systemService) {
        this.systemService = systemService;
    }
    listAllEndpointsSorted() {
        return this.systemService.listAllEndpointsSorted();
    }
    getSystemInfo() {
        return this.systemService.getSystemInfo();
    }
    async getServerAndDatabaseTime() {
        return await this.systemService.getServerAndDatabaseTime();
    }
    resetDatabase() {
        return this.systemService.resetDatabase();
    }
    getDatabaseInfo() {
        return this.systemService.getDatabaseInfo();
    }
    getEntitiesInfo() {
        return this.systemService.getEntitiesInfo();
    }
    getPackageInfo() {
        return this.systemService.getPackageInfo();
    }
    getServerDomain(request) {
        console.log('request: ', request);
        const domain = `${request.protocol}://${request.get('host')}`;
        const info = {
            domain,
            protocol: request.protocol,
            host: request.get('host'),
            subdomain: request.subdomains[0],
            originalUrl: request.originalUrl,
            baseUrl: request.baseUrl,
            params: request.params,
            query: request.query,
            path: request.path,
            method: request.method,
            headers: request.headers,
            body: request.body,
            route: request.route,
        };
        return info;
    }
    getCookies(request) {
        const cookies = this.parseCookies(request.headers.cookie || '');
        return { cookies };
    }
    parseCookies(cookieHeader) {
        const cookies = {};
        cookieHeader.split(';').forEach((cookie) => {
            const [name, ...rest] = cookie.split('=');
            const value = rest.join('=').trim();
            if (name && value) {
                cookies[name.trim()] = decodeURIComponent(value);
            }
        });
        return cookies;
    }
    getAllEndpoints() {
        return this.systemService.listAllEndpoints();
    }
    async runMigrations() {
        return this.systemService.runMigrations();
    }
};
exports.SystemController = SystemController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "listAllEndpointsSorted", null);
__decorate([
    (0, common_1.Get)('info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getSystemInfo", null);
__decorate([
    (0, common_1.Get)('time'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SystemController.prototype, "getServerAndDatabaseTime", null);
__decorate([
    (0, common_1.Delete)('resetDatabase'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "resetDatabase", null);
__decorate([
    (0, common_1.Get)('infoDatabase'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getDatabaseInfo", null);
__decorate([
    (0, common_1.Get)('entities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getEntitiesInfo", null);
__decorate([
    (0, common_1.Get)('package.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getPackageInfo", null);
__decorate([
    (0, common_1.Get)('domain'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getServerDomain", null);
__decorate([
    (0, common_1.Get)('cookies'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getCookies", null);
__decorate([
    (0, common_1.Get)('endpoints'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SystemController.prototype, "getAllEndpoints", null);
__decorate([
    (0, common_1.Post)('runMigrations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SystemController.prototype, "runMigrations", null);
exports.SystemController = SystemController = __decorate([
    (0, common_1.Controller)('system'),
    __metadata("design:paramtypes", [system_service_1.SystemService])
], SystemController);
//# sourceMappingURL=system.controller.js.map