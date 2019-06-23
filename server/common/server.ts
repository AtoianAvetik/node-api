import express, { Application } from 'express';
import os from 'os';
import { applyMiddleware, applyRoutes, applyAPIDocs, applyMysqlConnections } from '../utils';
import l from './logger';

class ExpressServer {
	public app: express.Application;
	public mysqlConnections = {};

	constructor() {
		this.app = express();

        process.on("uncaughtException", e => {
            console.log(e);
            process.exit(1);
        });
        process.on("unhandledRejection", e => {
            console.log(e);
            process.exit(1);
        });
	}

	middleware(middlewares: any): ExpressServer {
		applyMiddleware( middlewares, this.app );
		return this;
	}

	docs(docs: any): ExpressServer {
		applyAPIDocs( docs, this.app );
		return this;
	}

	router( routes: any ): ExpressServer {
		applyRoutes(routes, this.app);
		return this;
	}

	errors( errorHandlers: any ): ExpressServer {
        applyMiddleware(errorHandlers, this.app);
        return this;
	}

    mysql( dbs: any ): ExpressServer {
        applyMysqlConnections(dbs, this);
        return this;
	}

	listen( p: string | number = process.env.PORT ): ExpressServer {
		const welcome = port => () => l.info( `up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}` );
		this.app.listen( p, welcome( p ) );
		return this;
	}
}

export default ExpressServer;
