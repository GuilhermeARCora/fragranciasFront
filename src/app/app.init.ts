import { firstValueFrom } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';

export function preloadUser(authService: AuthService) {
  return () => firstValueFrom(authService.getMe()).catch(() => null);
}
