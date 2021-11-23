import dotEnv from 'dotenv';
/**
 * 
 * @returns defined variable in .env file
 */
const parsed = () => dotEnv.config().parsed || {};

/**
 * 
 * @param name  env variable name
 * @returns current node environment value for given name
 */
export const getEnv = (name: string): string | undefined => 
  parsed()[name] || process.env[name];  

/**
 * Checks if value of env variable with provided name
 * partially matches search vaule
 * @param search env variable name
 * @param name partial value to assert
 */
export const envIs = (search: string, name: string): boolean => 
(getEnv(name) || "").includes(search)