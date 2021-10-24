import { getDatabase } from '~/server/db';
import { config } from 'dotenv';

async function dbSync() {
  const db = await getDatabase();

  await db.synchronize();
  await db.close();
  process.exit(0);
}

config();
dbSync().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
