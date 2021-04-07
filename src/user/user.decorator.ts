import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IUser } from "./user.interfaces";

export const User = createParamDecorator((data: string, ctx: ExecutionContext): IUser | undefined => {
  return ctx.switchToHttp().getRequest().user;
});