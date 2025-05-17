import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// export const SessionInfo = createParamDecorator(
//     (_,ctx:ExecutionContext)=>ctx.switchToHttp().getRequest().session,
// );
export const SessionInfo = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const session = ctx.switchToHttp().getRequest().session;
    // Возвращаем только нужные поля
    return {
      id: session?.id,
      email: session?.email,
      iat: session?.iat,
      exp: session?.exp,
    };
  },
);
