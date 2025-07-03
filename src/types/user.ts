export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: 'master_admin' | 'admin' | 'user'
  organization_id: string | null
  is_active: boolean
  invited_by: string | null
  invited_at: string | null
  last_login: string | null
  created_at: string
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface UserInvitation {
  id: string
  email: string
  role: 'admin' | 'user'
  organization_id: string
  invited_by: string
  token: string
  expires_at: string
  accepted_at: string | null
  created_at: string
}

export interface InviteUserData {
  email: string
  role: 'admin' | 'user'
  full_name?: string
}