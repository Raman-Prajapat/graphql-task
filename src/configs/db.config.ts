export type Dialect =
  | 'mysql'
  | 'postgres'
  | 'sqlite'
  | 'mariadb'
  | 'mssql'
  | 'db2'
  | 'snowflake'
  | 'oracle';

export type DBCredentialPayload = {
  DIALECT: Dialect;
  HOST: string;
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
};

export const dbCredential: DBCredentialPayload = {
  DIALECT: (process.env.DIALECT as Dialect) || 'postgres',
  HOST: process.env.HOST || 'localhost',
  PORT: Number(process.env.DB_PORT) || 5432,
  USERNAME: process.env.DB_USERNAME || 'postgres',
  PASSWORD: process.env.PASSWORD || 'secret',
  DATABASE: process.env.DATABASE || 'graphql-task',
};
