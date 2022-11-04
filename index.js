import { ApolloServer, gql, UserInputError } from "apollo-server";

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
        street: "street fighter 2",
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
    enum YesNo{
        YES
        NO
    }
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
        allPeople(phone: YesNo): [Person]!
        findPerson(name: String!): Person
    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ) : Person
        editPhoneNumber(
            name: String!
            phone: String!
        ): Person
    }
`;

const resolvers = {
    Query: {
        personCount: () => people.length,
        allPeople: (root, args) => {
            if(!args.phone) return people

            // return people.filter(person=>{
            //     args.phone==="YES" ? person.phone : !person.phone
            // })

            const byPhone = person =>
            args.phone === "YES" ? person.phone : !person.phone

            return people.filter(byPhone)
        },
        findPerson: (root, args) => {
        const { name } = args;
        return people.find((person) => person.name === name);
        },
    },
    Mutation : {
        addPerson: (root, args) => {
            if(people.find(person => person.name === args.name)){
                throw new UserInputError("Name cannot be duplicated.", {
                    invalidArgs: args.name
                })
            }
            const person = { ...args, id : people.length + 1 }
            people.push(person)
            return person
        },
        editPhoneNumber: (root, args) => {
            const personIndex = people.findIndex(p => p.name === args.name)
            if(personIndex === -1) return null

            const personToUpdate = people[personIndex]

            const updatedPerson = { ...personToUpdate, phone: args.phone }
            people[personIndex] = updatedPerson
            return updatedPerson
        }
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