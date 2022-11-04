# grapql-server-test
This is a test for GraphQL

## GraphQL commands to use the queries and mutation for this example
You can use these commands to fetch, insert and edit data for this example using GraphQL
```graphql
mutation {
  addPerson(name: "Person 4", street: "Dragon Ball Z", city: "Mexico City") {
    name
    id
    address {
      city
      street
    }
  }
  editPhoneNumber(name: "Person 1", phone: "5511111122") {
    id
    name
    phone
    address {
      city
      street
    }
  }
}

query{
  personCount
  findPerson(name: "Person 4") {
    id
    name
    phone
    address {
      city
      street
    }
  }
  allPeople {
    id
    name
    phone
    address {
      city
      street
    }
  }
}
```
