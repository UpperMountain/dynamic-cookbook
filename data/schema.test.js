import { matchers as schemaMatchers } from "jest-json-schema";
import yaml from "js-yaml";
import schema from "./schema.json";
import fs from "fs";
import { resolve } from "path";
import { inspect, promisify } from "util";
import { yamlSchema } from "./yamlTypes.js";
const readFile = promisify(fs.readFile);

// install json-schema Jest matchers
expect.extend(schemaMatchers);

let pasta;
beforeAll(async () => {
  const ymlFile = await readFile(
    resolve(__dirname, "./recipes/pasta.yml"),
    "utf-8"
  );
  const parsed = yaml.loadAll(ymlFile, null, { schema: yamlSchema });
  pasta = parsed;
});

describe("JSON schema", () => {
  it("should be valid", () => {
    expect(schema).toBeValidSchema();
  });
});

const testAll = fn => {
  for (let item of pasta) {
    try {
      fn(item);
    } catch (err) {
      console.warn(item);
      throw err;
    }
  }
};

describe("all data", () => {
  it("should pass schema validation", () => {
    testAll(item => {
      expect(item).toMatchSchema(schema);
    });
  });

  it("should have an id for each item", () => {
    testAll(item => {
      expect(item.id).toBeDefined();
      expect(item.id._id).toBeDefined();
    });
  });

  it("should have no duplicate ids", () => {
    const ids = new Set();

    testAll(item => {
      const id = item.id._id;
      expect(ids.has(id)).toBe(false);
      ids.add(item.id._id);
    });
  });
});
