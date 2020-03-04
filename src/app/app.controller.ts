import { Controller, Get, Req, Res, Query } from "@nestjs/common";
import { Request, Response } from "express";
import { randomBytes } from "crypto";

@Controller()
export class AppController {
  @Get()
  home(): string {
    return "hello";
  }
  @Get("/error")
  error(): string {
    return "error";
  }

  @Get("/callback")
  callback(
    @Req() req: Request,
    @Res() res: Response,
    @Query("state") state: string
  ): void {
    // TODO: https://docs.nestjs.com/fundamentals/injection-scopes#request-provider
    // これを使って透過的に扱える Cookie Store 的なやつを作らないと治安が悪くなる
    const cookieState = req.signedCookies["state"];
    console.log(state, cookieState);
    if (state && cookieState && state === cookieState) {
      return res.redirect("/");
    }
    res.redirect("/error");
  }

  @Get("/url")
  url(@Req() req: Request, @Res() res: Response): void {
    const port = "3000";
    const state = randomBytes(8).toString("hex");

    const url = new URL("/external", `${req.protocol}://${req.hostname}`);
    url.port = port;
    url.searchParams.append("state", state);

    // return string の形で書くとレスポンスが返ってこない
    res.cookie("state", state, { signed: true }).send(url.toString());
  }

  @Get("/external")
  async external(
    @Res() res: Response,
    @Query("state") state: string
  ): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    res.redirect(`/callback?state=${state}`);
  }
}
