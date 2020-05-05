import { DocumentNode } from "graphql";
import { Operation } from "@urql/core";
import gql from "graphql-tag";
import { handleResponse } from "./index";

jest.mock("nanoid", () => ({
  __esModule: true,
  default: () => "[nanoid]",
}));

interface TestCase {
  query: DocumentNode;
  variables?: any;
  data: any;
}

const expectCorrectOutput = (testcase: TestCase) => {
  const operation: Operation = {
    query: testcase.query,
    variables: testcase.variables,
    operationName: "query",
    context: { meta: { cacheOutcome: "hit" } },
  } as any;

  return expect(
    handleResponse({ operation, data: testcase.data, parsedNodes: {} })
  );
};

it("int on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        int
      }
    `,
    data: { __typename: "Query", int: 42 },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "int": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "int",
        "name": "int",
        "value": 42,
      },
    }
  `);
});

it("complex query", () => {
  expectCorrectOutput({
    query: gql`
      {
        feed(first: 10, skip: 1, orderBy: "DESC") {
          links {
            id
            url
            description
            postedBy {
              id
              name
              __typename
            }
            votes {
              id
              user {
                id
                __typename
              }
              __typename
            }
            createdAt
            __typename
          }
          count
          __typename
        }
      }
    `,
    data: {
      feed: {
        links: [
          {
            id: "ck03zlsr8qg4o0b53x2z7drw8",
            url: "https://www.prismagraphql.com",
            description: "Prisma turns your database into a GraphQL API 😎",
            postedBy: null,
            votes: [
              {
                id: "ck06q9uikf5iw0b53dyjb0fbf",
                user: { id: "ck06q5r9ef4cb0b53xl6mzlo4", __typename: "User" },
                __typename: "Vote",
              },
            ],
            createdAt: "2019-09-03T15:28:04.052Z",
            __typename: "Link",
          },
        ],
        count: 5,
        __typename: "Feed",
      },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "feed({\\"first\\":10,\\"orderBy\\":\\"DESC\\",\\"skip\\":1})": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": Object {
          "first": 10,
          "orderBy": "DESC",
          "skip": 1,
        },
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Feed",
          },
          "count": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "count",
            "name": "count",
            "value": 5,
          },
          "links": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "children": Array [
              Object {
                "__typename": Object {
                  "_id": "[nanoid]",
                  "_owner": Object {},
                  "args": undefined,
                  "cacheOutcome": "hit",
                  "key": "__typename",
                  "name": "__typename",
                  "value": "Link",
                },
                "createdAt": Object {
                  "_id": "[nanoid]",
                  "_owner": Object {},
                  "args": undefined,
                  "cacheOutcome": "hit",
                  "key": "createdAt",
                  "name": "createdAt",
                  "value": "2019-09-03T15:28:04.052Z",
                },
                "description": Object {
                  "_id": "[nanoid]",
                  "_owner": Object {},
                  "args": undefined,
                  "cacheOutcome": "hit",
                  "key": "description",
                  "name": "description",
                  "value": "Prisma turns your database into a GraphQL API 😎",
                },
                "id": Object {
                  "_id": "[nanoid]",
                  "_owner": Object {},
                  "args": undefined,
                  "cacheOutcome": "hit",
                  "key": "id",
                  "name": "id",
                  "value": "ck03zlsr8qg4o0b53x2z7drw8",
                },
                "postedBy": Object {
                  "_id": "[nanoid]",
                  "_owner": Object {},
                  "args": undefined,
                  "cacheOutcome": "hit",
                  "key": "postedBy",
                  "name": "postedBy",
                  "value": null,
                },
                "url": Object {
                  "_id": "[nanoid]",
                  "_owner": Object {},
                  "args": undefined,
                  "cacheOutcome": "hit",
                  "key": "url",
                  "name": "url",
                  "value": "https://www.prismagraphql.com",
                },
                "votes": Object {
                  "_id": "[nanoid]",
                  "_owner": Object {},
                  "args": undefined,
                  "cacheOutcome": "hit",
                  "children": Array [
                    Object {
                      "__typename": Object {
                        "_id": "[nanoid]",
                        "_owner": Object {},
                        "args": undefined,
                        "cacheOutcome": "hit",
                        "key": "__typename",
                        "name": "__typename",
                        "value": "Vote",
                      },
                      "id": Object {
                        "_id": "[nanoid]",
                        "_owner": Object {},
                        "args": undefined,
                        "cacheOutcome": "hit",
                        "key": "id",
                        "name": "id",
                        "value": "ck06q9uikf5iw0b53dyjb0fbf",
                      },
                      "user": Object {
                        "_id": "[nanoid]",
                        "_owner": Object {},
                        "args": undefined,
                        "cacheOutcome": "hit",
                        "children": Object {
                          "__typename": Object {
                            "_id": "[nanoid]",
                            "_owner": Object {},
                            "args": undefined,
                            "cacheOutcome": "hit",
                            "key": "__typename",
                            "name": "__typename",
                            "value": "User",
                          },
                          "id": Object {
                            "_id": "[nanoid]",
                            "_owner": Object {},
                            "args": undefined,
                            "cacheOutcome": "hit",
                            "key": "id",
                            "name": "id",
                            "value": "ck06q5r9ef4cb0b53xl6mzlo4",
                          },
                        },
                        "key": "user",
                        "name": "user",
                      },
                    },
                  ],
                  "key": "votes",
                  "name": "votes",
                },
              },
            ],
            "key": "links",
            "name": "links",
          },
        },
        "key": "feed({\\"first\\":10,\\"orderBy\\":\\"DESC\\",\\"skip\\":1})",
        "name": "feed",
      },
    }
  `);
});

it("aliased field on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        anotherName: int
      }
    `,
    data: { __typename: "Query", anotherName: 42 },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "int": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "int",
        "name": "int",
        "value": 42,
      },
    }
  `);
});

it("json on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        json
      }
    `,
    // The `__typename` field should not mislead the cache
    data: {
      __typename: "Query",
      json: { __typename: "Misleading", test: true },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "json": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "json",
        "name": "json",
        "value": Object {
          "__typename": "Misleading",
          "test": true,
        },
      },
    }
  `);
});

it("nullable field on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        missing
      }
    `,
    data: { __typename: "Query", missing: null },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "missing": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "missing",
        "name": "missing",
        "value": null,
      },
    }
  `);
});

it("int field with arguments on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        int(test: true)
      }
    `,
    data: { __typename: "Query", int: 42 },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "int({\\"test\\":true})": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": Object {
          "test": true,
        },
        "cacheOutcome": "hit",
        "key": "int({\\"test\\":true})",
        "name": "int",
        "value": 42,
      },
    }
  `);
});

it("non-keyable entity on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          name
        }
      }
    `,
    // This entity has no `id` or `_id` field
    data: { __typename: "Query", item: { __typename: "Item", name: "Test" } },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Item",
          },
          "name": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "name",
            "name": "name",
            "value": "Test",
          },
        },
        "key": "item",
        "name": "item",
      },
    }
  `);
});

it("invalid entity on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          id
          name
        }
      }
    `,
    // This entity comes back with an invalid typename (for some reason or another)
    data: {
      __typename: "Query",
      item: { __typename: null, id: "123", name: "Test" },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": null,
          },
          "id": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "id",
            "name": "id",
            "value": "123",
          },
          "name": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "name",
            "name": "name",
            "value": "Test",
          },
        },
        "key": "item",
        "name": "item",
      },
    }
  `);
});

it("non-IDable entity on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        item {
          name
          __typename
        }
        __typename
      }
    `,
    // This entity has a `__typename` but no ID fields
    data: { __typename: "Query", item: { __typename: "Item", name: "Test" } },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Item",
          },
          "name": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "name",
            "name": "name",
            "value": "Test",
          },
        },
        "key": "item",
        "name": "item",
      },
    }
  `);
});

it("entity on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        item {
          id
          name
          __typename
        }
        __typename
      }
    `,
    data: {
      __typename: "Query",
      item: { __typename: "Item", id: "1", name: "Test" },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Item",
          },
          "id": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "id",
            "name": "id",
            "value": "1",
          },
          "name": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "name",
            "name": "name",
            "value": "Test",
          },
        },
        "key": "item",
        "name": "item",
      },
    }
  `);
});

it("entity on aliased field on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        anotherName: item {
          __typename
          id
          name
        }
      }
    `,
    data: {
      __typename: "Query",
      anotherName: { __typename: "Item", id: "1", name: "Test" },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Item",
          },
          "id": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "id",
            "name": "id",
            "value": "1",
          },
          "name": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "name",
            "name": "name",
            "value": "Test",
          },
        },
        "key": "item",
        "name": "item",
      },
    }
  `);
});

it("entity with arguments on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item(test: true) {
          __typename
          id
          name
        }
      }
    `,
    data: {
      __typename: "Query",
      item: { __typename: "Item", id: "1", name: "Test" },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item({\\"test\\":true})": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": Object {
          "test": true,
        },
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Item",
          },
          "id": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "id",
            "name": "id",
            "value": "1",
          },
          "name": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "name",
            "name": "name",
            "value": "Test",
          },
        },
        "key": "item({\\"test\\":true})",
        "name": "item",
      },
    }
  `);
});

it("entity with Int-like ID on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          id
          name
        }
      }
    `,
    // This is the same as above, but with a number on `id`
    data: {
      __typename: "Query",
      item: { __typename: "Item", id: 1, name: "Test" },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Item",
          },
          "id": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "id",
            "name": "id",
            "value": 1,
          },
          "name": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "name",
            "name": "name",
            "value": "Test",
          },
        },
        "key": "item",
        "name": "item",
      },
    }
  `);
});

it("entity list on query", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        items {
          __typename
          id
        }
      }
    `,
    data: {
      __typename: "Query",
      items: [
        { __typename: "Item", id: 1 },
        { __typename: "Item", id: 2 },
      ],
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "items": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Array [
          Object {
            "__typename": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "__typename",
              "name": "__typename",
              "value": "Item",
            },
            "id": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "id",
              "name": "id",
              "value": 1,
            },
          },
          Object {
            "__typename": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "__typename",
              "name": "__typename",
              "value": "Item",
            },
            "id": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "id",
              "name": "id",
              "value": 2,
            },
          },
        ],
        "key": "items",
        "name": "items",
      },
    }
  `);
});

it("entity list on query and inline fragment", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        items {
          __typename
          id
        }
        ... on Query {
          items {
            test
          }
        }
      }
    `,
    data: {
      __typename: "Query",
      items: [{ __typename: "Item", id: 1, test: true }, null],
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "items": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Array [
          Object {
            "__typename": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "__typename",
              "name": "__typename",
              "value": "Item",
            },
            "id": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "id",
              "name": "id",
              "value": 1,
            },
            "test": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "test",
              "name": "test",
              "value": true,
            },
          },
          null,
        ],
        "key": "items",
        "name": "items",
      },
    }
  `);
});

it("entity list on query and spread fragment", () => {
  expectCorrectOutput({
    query: gql`
      query Test {
        __typename
        items {
          __typename
          id
        }
        ...TestFragment
      }

      fragment TestFragment on Query {
        items {
          test
        }
      }
    `,
    data: {
      __typename: "Query",
      items: [{ __typename: "Item", id: 1, test: true }, null],
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "items": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Array [
          Object {
            "__typename": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "__typename",
              "name": "__typename",
              "value": "Item",
            },
            "id": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "id",
              "name": "id",
              "value": 1,
            },
            "test": Object {
              "_id": "[nanoid]",
              "_owner": Object {},
              "args": undefined,
              "cacheOutcome": "hit",
              "key": "test",
              "name": "test",
              "value": true,
            },
          },
          null,
        ],
        "key": "items",
        "name": "items",
      },
    }
  `);
});

it("embedded invalid object on entity", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          id
          author {
            __typename
            name
          }
        }
      }
    `,
    data: {
      __typename: "Query",
      item: {
        __typename: "Item",
        id: 1,
        author: {
          __typename: "Author",
          name: "Stanley",
        },
      },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Item",
          },
          "author": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "children": Object {
              "__typename": Object {
                "_id": "[nanoid]",
                "_owner": Object {},
                "args": undefined,
                "cacheOutcome": "hit",
                "key": "__typename",
                "name": "__typename",
                "value": "Author",
              },
              "name": Object {
                "_id": "[nanoid]",
                "_owner": Object {},
                "args": undefined,
                "cacheOutcome": "hit",
                "key": "name",
                "name": "name",
                "value": "Stanley",
              },
            },
            "key": "author",
            "name": "author",
          },
          "id": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "id",
            "name": "id",
            "value": 1,
          },
        },
        "key": "item",
        "name": "item",
      },
    }
  `);
});

it("embedded object on entity", () => {
  expectCorrectOutput({
    query: gql`
      {
        __typename
        item {
          __typename
          id
          author {
            __typename
            id
            name
          }
        }
      }
    `,
    data: {
      __typename: "Query",
      item: {
        __typename: "Item",
        id: 1,
        author: {
          __typename: "Author",
          id: 1,
          name: "Stanley",
        },
      },
    },
  }).toMatchInlineSnapshot(`
    Object {
      "__typename": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "key": "__typename",
        "name": "__typename",
        "value": "Query",
      },
      "item": Object {
        "_id": "[nanoid]",
        "_owner": Object {},
        "args": undefined,
        "cacheOutcome": "hit",
        "children": Object {
          "__typename": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "__typename",
            "name": "__typename",
            "value": "Item",
          },
          "author": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "children": Object {
              "__typename": Object {
                "_id": "[nanoid]",
                "_owner": Object {},
                "args": undefined,
                "cacheOutcome": "hit",
                "key": "__typename",
                "name": "__typename",
                "value": "Author",
              },
              "id": Object {
                "_id": "[nanoid]",
                "_owner": Object {},
                "args": undefined,
                "cacheOutcome": "hit",
                "key": "id",
                "name": "id",
                "value": 1,
              },
              "name": Object {
                "_id": "[nanoid]",
                "_owner": Object {},
                "args": undefined,
                "cacheOutcome": "hit",
                "key": "name",
                "name": "name",
                "value": "Stanley",
              },
            },
            "key": "author",
            "name": "author",
          },
          "id": Object {
            "_id": "[nanoid]",
            "_owner": Object {},
            "args": undefined,
            "cacheOutcome": "hit",
            "key": "id",
            "name": "id",
            "value": 1,
          },
        },
        "key": "item",
        "name": "item",
      },
    }
  `);
});
