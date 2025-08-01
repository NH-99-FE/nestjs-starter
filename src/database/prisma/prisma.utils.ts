import { catchError, retry, throwError, timer } from "rxjs"
import { Logger } from "@nestjs/common"

export const PROTOCALREGEX = /^(.*?):\/\//

export function getDBType(url: string) {
  const matches = url.match(PROTOCALREGEX)

  const protocol = matches ? matches[1] : 'file'

  return protocol === 'file' ? 'sqlite': protocol
}

export function handleRetry(retryAttempts: number, retryDelay: number) {
  const logger = new Logger('PrismaModule')
  return (source) => source.pipe(
    retry({
      count: retryAttempts <0 ? Infinity : retryAttempts,
      delay: (error, retryCount) => {
        const attempts = retryAttempts <0 ? Infinity : retryAttempts
        if (retryCount <= attempts) {
          logger.error(`Unable to connect to the darabase. Retrying (${retryCount})...`,error.stack)
          return timer(retryDelay)
        } else {
          return throwError(() => new Error('Reached max retries'))
        }
      }
    }),
    catchError(error => {
      logger.error(`Failed to connect to the database after retries ${retryAttempts} times`, error.stack || error)
      return throwError(() => error)
    })
  )
}