import express, { Application, Request, Response, NextFunction, Router } from "express";
import swaggerUi from "swagger-ui-express";
import ExpressServer from "../common/server";
import mysql from "mysql";

type Wrapper = ((app: Application) => void);

export const applyMiddleware = (
	middleware: Wrapper[],
	app: Application
) => {
	for (const f of middleware) {
		f(app);
	}
};

type Handler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void> | void;

type RouterWrapper = {
	basePath: string;
	routes: Route[];
};

type Route = {
	path: string;
	method: string;
	handler: Handler | Handler[];
};

export const applyRoutes = (routers: RouterWrapper[], app: Application) => {
	for (const router of routers) {
		app.use(router.basePath, createRoutes(router.routes, express.Router()));
	}
};

const createRoutes = (routes: Route[], router: Router): Router => {
	for ( const route of routes ) {
		const { method, path, handler } = route;
		(router as any)[method]( path, handler );
	}
	return router;
};

type Doc = {
	path: string;
	document: any;
	options: any;
};

export const applyAPIDocs = (docs: Doc[], app: Application) => {
	for ( const doc of docs ) {
		const { path, document, options } = doc;
		const swaggerAPIHtml = swaggerUi.generateHTML(document, options);

		app.use(path, swaggerUi.serveFiles(document, options));
		app.get(path, (req, res) => { res.send(swaggerAPIHtml) });
	}
};

export const applyMysqlConnections = (dbs, server: ExpressServer) => {
    for ( const db of dbs ) {
        server.mysqlConnections[db.id] = mysql.createConnection(db.config);
	}
};
