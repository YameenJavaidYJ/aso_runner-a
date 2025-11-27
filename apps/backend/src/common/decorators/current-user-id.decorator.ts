import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to get current user ID from request
 * Usage: @CurrentUserId() userId: string
 */
export const CurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id || request.query?.userId;
  }
);

