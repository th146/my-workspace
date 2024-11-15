export interface JwtPayload {
    name: string; // Der Benutzername
    sub: number; // Die Benutzer-ID (wird üblicherweise als "sub" bezeichnet)
    role: string; // Die Rolle des Benutzers
  }
  