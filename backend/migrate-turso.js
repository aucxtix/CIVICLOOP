import fs from 'fs';
import { createClient } from '@libsql/client';

const url = "libsql://civicloop-furatixx121.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODc0ODM1ODYsImlkIjoiMDFhMDJlMDAtOTQwMS03NDdkLWIyY2MtYjgzZmI5ZGQxOWMyIiwia2lkIjoiRWJXRnF4aU1hM2tQU2dCUFBPU1g5cFpSRVN1ei1QSWx2NU5Ga2JXX1dCUSIsInJpZCI6Ijk1YWMzODJmLTMzODEtNDNiYS05NDBhLWM3YWE1ZmMzNWVmYSJ9.g-K8FGj65o8_O4WIpZUqY0rDYWqrzza6rfJChP32TbLEv9n31CbeqISJSIo6RdrsExE9gqObZr1gRrdbHtr4BA";

async function runMigration() {
  try {
    const client = createClient({ url, authToken });
    const sql = fs.readFileSync('migration.sql', 'utf8');
    
    console.log('Connecting to Turso database...');
    
    // Split by semicolons and filter out empty queries
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    console.log(`Found ${statements.length} statements to execute.`);
    
    // Execute each statement in a transaction
    const transaction = await client.transaction('write');
    for (let i = 0; i < statements.length; i++) {
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      await transaction.execute(statements[i]);
    }
    await transaction.commit();
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigration();
