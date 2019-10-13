// @TODO very basic config type obviously to be extended to fit the app needs as it grows

type devices = 'desktop' | 'mobile';

type ConfigurationEntityProp = devices;
type ConfigurationEntityType = string | boolean | string[] | object | RegExp;

export type Configuration = {
  [prop in ConfigurationEntityProp]?: ConfigurationEntityType;
};
