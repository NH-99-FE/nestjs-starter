import { Global, Module, OnApplicationShutdown, Provider } from "@nestjs/common";
import { PrismaClient as MySQLClient } from 'prisma/clients/mysql';
import { PrismaModuleOptions } from "./prisma-options.interface";
import { getDBType, handleRetry } from "./prisma.utils";
import { PRISMA_CONNECTION_NAME } from "./prisma.constants";
import { error } from "console";
import { defer, lastValueFrom, catchError } from "rxjs";

@Global()
@Module({
})
export class PrismaCoreModule implements OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    throw new Error('Method not implemented.')
  }

  static forRoot(_options: PrismaModuleOptions){
    const {url, options = {}, name, retryAttempts=10, retryDelay=3000, connectionFactory, connectionErrorFactory} = _options

    let newOptions = {
      datasourceUrl: url,
    }
    if (Object.keys(options).length){
      newOptions = {...newOptions, ...options}
    }

    const dbType = getDBType(url as string)
    let _prismaClient 
    if(dbType === 'mysql') {
      _prismaClient = MySQLClient
    }else {
      throw new Error(`Unsupported dataset type: ${dbType}`)
    }

    const prismaConnectionErrorFactory = connectionErrorFactory || (error => error)
    const prismaConnectionFactory = connectionFactory || (async (clientOptiopns) => await new _prismaClient(clientOptiopns))

    const prividerName = name || PRISMA_CONNECTION_NAME

    const prismaClientProvider: Provider = {
      provide: prividerName,
      useFactory: async() => {
        // 加入错误重试
        const client = await prismaConnectionFactory(newOptions, name as string)
        return lastValueFrom(
          defer(async () => await client.$connect()).pipe(
            handleRetry(retryAttempts, retryDelay),
            catchError((error) => {
              throw prismaConnectionErrorFactory(error)
            })
          )
        ).then(() => client)
      }
    }

    return {
      module: PrismaCoreModule,
      providers: [prismaClientProvider],
      exports: [prismaClientProvider]
    }
  }
  static forRootAsync(){}

}