import { Router } from "express";
import fs from "fs";

import { configApps } from "../../../../config";

export function registerRoutes(router: Router) {
  const files = fs.readdirSync(__dirname);
  const regex = /\broute\b/;
  files.forEach((file: string) => {
    if (regex.test(file)) {
      const route = require(`${__dirname}/${file}`);
      route.register(`${configApps.apiVersionedPath}/auth`, router);
    }
  });
}
