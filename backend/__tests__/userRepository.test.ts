// __tests__/userRepository.test.ts
import { expect } from 'chai'; // Add import statement for 'expect' from 'chai' library
import UserRepositoryImpl from '../src/infrastructure/Persistence/userRepositoryImpl'; // Update the import path to use lowercase 'userRepositoryImpl'
import User from '../src/domain/Entities/user'; // Add import statement for 'User' model

describe('User Repository', () => {
  // Escribe tus pruebas aquí basadas en TDD
  it('should find a user by ID', async () => {
    // Arrange
    const userRepository = new UserRepositoryImpl();
    const userId = 1;

    // Act
    const user = await userRepository.findById(userId);

    // Assert
    expect(user).to.not.be.null;
  });

  it('should find a user by username', async () => {
    // Arrange
    const userRepository = new UserRepositoryImpl();
    const username = 'testUser';

    // Act
    const user = await userRepository.findByUsername(username);

    // Assert
    expect(user).to.not.be.null;
  });

  it('should create a new user', async () => {
    // Arrange
    const userRepository = new UserRepositoryImpl();
    const user = new User(1, 'testUser', 'password', 'test@example.com');

    // Act
    const createdUser = await userRepository.createUser(user);

    // Assert
    expect(createdUser).to.not.be.null;
  });

  it('should update an existing user', async () => {
    // Arrange
    const userRepository = new UserRepositoryImpl();
    const user = new User(1, 'testUser', 'password', 'test@example.com');
    const updatedUser = new User(1, 'updatedUser', 'password', 'test@example.com');

    // Act
    const updated = await userRepository.updateUser(updatedUser);

    // Assert
    expect(updated).to.not.be.null;
  });

  it('should delete a user', async () => {
    // Arrange
    const userRepository = new UserRepositoryImpl();
    const user = new User(1, 'testUser', 'password', 'test@example.com');

    // Act
    await userRepository.deleteUser(user.id);

    // Assert
    // Add assertions to verify the user was deleted
  });
});