// infrastructure/Persistence/userRepositoryImpl.ts
import db from '../../dbConfig';
import UserRepository from '../../domain/Repositories/userRepository';
import User from '../../domain/Entities/user';

class UserRepositoryImpl implements UserRepository {
  async findById(id: number): Promise<User | null> {
    const result = await db.oneOrNone('SELECT * FROM users WHERE user_id = $1', [id]);
    return result ? new User(result.user_id, result.username, result.password, result.email) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    return result ? new User(result.user_id, result.username, result.password, result.email) : null;
  }

  async createUser(user: User): Promise<User> {
    const result = await db.one('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [user.username, user.password, user.email]);
    return new User(result.user_id, result.username, result.password, result.email);
  }

  async updateUser(user: User): Promise<User> {
    const result = await db.one('UPDATE users SET username = $1, password = $2, email = $3 WHERE user_id = $4 RETURNING *', [user.username, user.password, user.email, user.id]);
    return new User(result.user_id, result.username, result.password, result.email);
  }

  async deleteUser(id: number): Promise<void> {
    await db.none('DELETE FROM users WHERE user_id = $1', id);
  }
}

export default UserRepositoryImpl;