export interface Authenticate {
  username: string;
  password: string;
}

export interface AuthenticatedUser {
  name: string;
  access_token: string;
  scope: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
}
