import { PrismaClient } from '@prisma/client';
import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

let prisma: PrismaClient;

if (url && url.startsWith('libsql')) {
  const config: any = { url };
  if (authToken) config.authToken = authToken;
  const libsql = createClient(config);
  const adapter = new PrismaLibSQL(libsql as any);
  prisma = new PrismaClient({ adapter } as any);
} else {
  prisma = new PrismaClient();
}

export default prisma;
