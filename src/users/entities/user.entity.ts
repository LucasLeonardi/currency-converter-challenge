import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

interface Users extends InMemoryDBEntity {
  name: string;
  password: string;
}

export { Users }