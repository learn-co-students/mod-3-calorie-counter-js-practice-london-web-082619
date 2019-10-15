const basePath = "http://localhost:3000/api/v1/calorie_entries"

const getEntries = () => {
  return fetch(basePath)
    .then(response => validateResponse(response));
}

const postEntry = (body) => {
  const config = createConfigWithBody("POST", body)
  return fetch(basePath, config)
    .then(response => validateResponse(response));
}

const patchEntry = (entryId, body) => {
  const config = createConfigWithBody("PATCH", body);
  return fetch(`${basePath}/${entryId}`, config)
    .then(response => validateResponse(response));
}

const destroyEntry = (entryId) => {
  const config = createBaseConfig("DELETE");
  return fetch(`${basePath}/${entryId}`, config)
    .then(response => validateResponse(response));
}

const validateResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("HTTP status code " + response.status);
  }
}

const createConfigWithBody = (method, body) => {
  const APICompatibleBody = { api_v1_calorie_entry: body }
  const config = createBaseConfig(method);
  config.body = JSON.stringify(APICompatibleBody);
  return config;
}

const createBaseConfig = (method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
}

const adapter = {
  getEntries: getEntries,
  postEntry: postEntry,
  patchEntry: patchEntry,
  destroyEntry: destroyEntry
}