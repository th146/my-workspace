import * as Convict from "convict";

export interface WorkshopApiConfig {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
}

export const configSchema: Convict.Schema<WorkshopApiConfig> = {
  dbHost: {
    format: String,
    default: 'localhost',
    env: 'DB_HOST',
  },
  dbPort: {
    format: 'port',
    default: 5432,
    env: 'DB_PORT',
  },
  dbName: {
    format: String,
    default: 'newdb',
    env: 'DB_NAME',
  },
  dbUser: {
    format: String,
    default: 'postgres',
    env: 'DB_USER',
  },
  dbPassword: {
    format: String,
    default: 'root',
    env: 'DB_PASSWORD',
    sensitive: true,
  },
}

let instance: Convict.Config<WorkshopApiConfig> | null = null;

export function getConfig(): Convict.Config<WorkshopApiConfig> {
  if (instance === null) {
    instance = Convict.default(configSchema)
    instance.validate({ allowed: 'warn' })
    console.log(instance.toString())
  }
  return instance
}
