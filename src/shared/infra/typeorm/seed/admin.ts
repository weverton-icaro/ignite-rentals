import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at) 
      VALUES('${id}', 'Weverton Admin', 'admin@ignite.com.br', '${password}', 'true', 'xxxxxxxxxx','now()')`
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
