/**
 * Get the first element of the object
 * @param obj
 * @returns {*}
 */
export function getFirst(obj) {
  for (const key in obj) {
    return obj[key];
  }
}
