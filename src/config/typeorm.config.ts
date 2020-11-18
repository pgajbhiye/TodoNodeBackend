import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as path from "path";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig : TypeOrmModuleOptions =  {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username:  process.env.RDS_USERNAME || dbConfig.username,
    password:  process.env.RDS_PWD || dbConfig.password,
    database:  process.env.RDS_DB || dbConfig.database,
    entities : [path.resolve(__dirname , "../tasks/*.entity.{js,ts}"), path.resolve(__dirname , "../auth/*.entity.{js,ts}")],
    synchronize:  process.env.TYPE_ORM_SYNC || dbConfig.synchronize //Set false in PROD env
};
