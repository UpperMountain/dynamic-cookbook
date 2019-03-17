import yaml from "js-yaml";

export const yamlId = new yaml.Type("!id", {
  kind: "scalar",

  construct(data) {
    return { _id: data };
  }
});

export const yamlRef = new yaml.Type("!ref", {
  kind: "scalar",

  construct(data) {
    return { _ref: data };
  }
});

export const yamlSchema = yaml.Schema.create([yamlId, yamlRef]);
