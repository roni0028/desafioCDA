declare interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Banned';
  role: 'Admin' | 'User';
  bio: string;
  emblems: Embrems[];
}
