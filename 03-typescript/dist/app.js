"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hero_service_1 = require("./services/hero.service");
const hero = (0, hero_service_1.getHeroById)(2);
console.log(hero?.name ?? 'No hero found');
