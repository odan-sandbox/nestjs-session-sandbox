export function add(x: number, y: number): number {
  return x + y;
}
import { NestFactory } from "@nestjs/core";
import session from "express-session";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // app.set("trust proxy", 1);
  /*
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  app.use(
    cookieSession({
      name: "session",
      keys: ["key1", "key2"],
      secure: false,
      httpOnly: true,
      path: "/",
      expires: expiryDate
    })
  );
  */
  app.use(cookieParser("secret"));
  //app.use(session({ secret: "keyboard cat", cookie: { secure: true } }));

  await app.listen(3000);
}
bootstrap();
