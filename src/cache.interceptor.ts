import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from './auth/user.entity';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const req = context.switchToHttp().getRequest();
    if (req.method === 'GET') {
      if (req.user) {
        const user: User = req.user;
        const { username } = user;
        return `${username}/${req.originalUrl}`;
      }
      return `${req.originalUrl}`;
    }
  }
}
