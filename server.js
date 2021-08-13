require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4ODM3MzgwfQ.UbyQykaOwEmEDArP-JhlW8ktxAvD816ojn2aoXnm7PE",
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`🙏Server is running on http://localhost:${PORT}/`));
