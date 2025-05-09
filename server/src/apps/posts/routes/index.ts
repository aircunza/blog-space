import { Router } from "express";
import fs from "fs";

export function registerRoutes(router: Router) {
  const files = fs.readdirSync(__dirname);
  const regex = /\broute\b/;
  files.forEach(function (file: string) {
    if (regex.test(file)) {
      const route = require(`${__dirname}/${file}`);
      route.register(router);
    }
  });
}
