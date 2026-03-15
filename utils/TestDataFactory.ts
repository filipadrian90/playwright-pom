import { faker } from "@faker-js/faker";
import type { User } from "../types";

export class TestDataFactory {
  createUser(overrides: Partial<User> = {}): User {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: "user",
      ...overrides,
    };
  }

  getValidApiCredentials() {
    return { email: "eve.holt@reqres.in", password: "pistol" };
  }

  getInvalidCredentials() {
    return { email: faker.internet.email(), password: "wrong" };
  }

  createJobPayload() {
    return { name: faker.person.fullName(), job: faker.person.jobTitle() };
  }
}
