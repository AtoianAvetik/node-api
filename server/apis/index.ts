import examplesRouter from './examples/controllers/router'
import herasRouter from './examples/controllers/router'

import examplesSwaggerDocument from './examples/swagger.json';
import herasSwaggerDocument from "./heras/swagger.json";

export const routes = [
	{
		basePath: '/api/v1/examples',
		routes: examplesRouter
	},
	{
		basePath: '/api/v1/heras',
		routes: herasRouter
	},
];

export const docs = [
	{
		path: '/examples/api/v1/docs',
		document: examplesSwaggerDocument,
		options: {}
	},
	{
		path: '/heras/api/v1/docs',
		document: herasSwaggerDocument,
		options: {}
	}
];
