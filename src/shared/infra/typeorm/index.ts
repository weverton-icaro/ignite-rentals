import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test",
      database:
        process.env.NODE_ENV === "test"
          ? "ignite_test"
          : defaultOptions.database,
    })
  );
};
