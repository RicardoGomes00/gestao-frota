import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Pega o perfil esperado da propriedade 'data' da rota
  const expectedRole = route.data['expectedRole'];
  
  if (!authService.isLoggedIn()) {
    // Se não estiver logado, redireciona para a tela de login
    router.navigate(['/login']);
    return false;
  }
  
  const currentUserProfile = authService.getUserProfile();

  // Verifica se o usuário tem o perfil esperado para acessar a rota
  if (currentUserProfile !== expectedRole) {
    // Se não tiver permissão, redireciona para a página inicial do seu perfil
    if (currentUserProfile === 'ADMIN') {
      router.navigate(['/admin/inicio']);
    } else {
      router.navigate(['/motorista/inicio']);
    }
    return false;
  }

  // Se estiver logado e tiver o perfil correto, permite o acesso
  return true;
};