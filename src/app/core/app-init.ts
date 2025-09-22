import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

export function initApp(): Promise<void> {
  const authService = inject(AuthService);

  // sempre tenta buscar o usuário logado
  return firstValueFrom(authService.loggedUser())
    .then(user => {
      authService.setCurrentUser(user); // popula BehaviorSubject
    })
    .catch(() => {
      authService.logout(); // limpa estado se não houver sessão válida
    })
    .then(() => void 0); // garante que resolve Promise<void>
};
