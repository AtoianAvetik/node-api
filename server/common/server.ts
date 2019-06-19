import express, { Application } from 'express';
import os from 'os';
import { applyMiddleware, applyRoutes, applyAPIDocs } from '../utils';
import l from './logger';

class ExpressServer {
	public app: express.Application;

	constructor() {
		this.app = express();
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

	listen( p: string | number = process.env.PORT ): Application {
		const welcome = port => () => l.info( `up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}` );
		this.app.listen( p, welcome( p ) );
		return this.app;
	}
}

export default ExpressServer;
