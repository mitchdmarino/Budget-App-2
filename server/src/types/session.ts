export interface Session {
  id: string;
  user_id: string;
  expires_at: Date;
  revoked_at: Date | null;
}; 