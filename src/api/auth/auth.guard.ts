import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger();

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.cookies.__session;
      const session = await clerkClient.verifyToken(token);
      request.user = { user_id: session.sub };
    } catch (error) {
      this.logger.error(error);
      return false;
    }

    return true;
  }
}
