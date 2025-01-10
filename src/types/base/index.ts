/* Packages */
import { HttpStatusCode } from 'axios'
/**
 * Represents the base API response.
 *
 * @template D - The type of the response data.
 * @template M - The type of the response message.
 * @template E - The type of the response error.
 */
export interface BaseAPIResponse<D = unknown, M = string, E = unknown> {
  statusCode: HttpStatusCode
  message: M
  data: D
  error?: E
}
