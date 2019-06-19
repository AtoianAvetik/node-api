import express, { Application } from 'express';
import path from "path";

export const handleApiDocs = ( app: Application ) => {
	const apiDocsPath = path.join( __dirname, '/../../public/docs/' );
	const apiExplorerPath = path.join( __dirname, '/../../public/api-explorer/' );

	app.use( process.env.API_EXPLORER || '/api-explorer', express.static( apiExplorerPath ) );
	app.use( process.env.API_DOCS || '/docs', express.static( apiDocsPath ) );
};

