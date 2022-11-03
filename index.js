import { ApolloServer, gql } from "apollo-server";

const people = [
    {
        name: "Person 1",
        phone: "5511111111",
        street: "Dragon Ball Fighterz",
        city: "Mexico",
        id: 1,
    },
    {
        name: "Person 2",
        phone: "5511111111",
        // street: "street fighter 2",
        city: "Mexico",
        id: 2,
    },
    {
        name: "Person 3",
        phone: "5511111111",
        street: "Tekken 3",
        city: "Mexico",
        id: 3,
    },
];

const typeDefinitions = gql`
    type Address {
        street:String!
        city:String!
    }
    type Person {
        name: String!
        address: Address!
        phone: String
        id: Int!
    }

    type Query {
        personCount: Int!
        allPeople: [Person]!
        findPerson(name: String!): Person
    }
`;

const resolvers = {
    Query: {
        personCount: () => people.length,
        allPeople: () => people,
        findPerson: (root, args) => {
        const { name } = args;
        return people.find((person) => person.name === name);
        },
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city,
            };
        }
    },
};

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`The server ir up and running at ${url}`);
});
