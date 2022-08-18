export const invalidUser1 = { email: 'testeu@teste.com' }
export const invalidUser2 = { password: 'teste' }
export const invalidUser3 = {};

export const authorizedValidUser = { email: 'authorized@teste.com', password: 'teste' };

export const validUserData = {
  id: 1,
  username: 'tester',
  role: 'teste',
  email: 'authorized@teste.com',
  password: 'any-password-hashed'
}

export const validUserPayload = {
  role: 'teste',
  email: 'authorized@teste.com'
}

export const unauthorizedValidUser = { email: 'unauthorized@teste.com', password: 'wrongpassword' };