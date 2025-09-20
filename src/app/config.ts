
import dotenv from 'dotenv';
import path from 'path';

// This file ensures that environment variables are loaded for server-side actions,
// especially during local development. It's imported at the top of action files.

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
