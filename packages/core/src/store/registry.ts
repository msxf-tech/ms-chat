const registry = new Map<string, any>();

export const registryMessageType = (type: string, component: any) => {
  registry.set(type, component);
};

export const getMessageComponent = (type: string) => {
  return registry.get(type);
};

export const getAllMessageTypes = () => {
  return [...registry.keys()];
};

export const clearregistry = () => {
  registry.clear();
};
