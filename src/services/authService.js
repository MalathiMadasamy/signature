/**
 * DetectiSign Authentication Service (Simulated LocalStorage Auth)
 */

const AUTH_KEY = 'detectisign_auth_user';

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const login = (email, password) => {
  const user = {
    email: email || 'demo.user@detectisign.ai',
    name: 'Demo Verified Analyst',
    role: 'Security Specialist',
    loggedInAt: new Date().toISOString()
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
};

export const loginAsDemoUser = () => {
  return login('demo.evaluator@university.edu', 'demo123');
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
