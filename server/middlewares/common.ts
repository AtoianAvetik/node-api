import { Application } from "express";
import cors from "cors";
import parser from "body-parser";
import cookieParser from 'cookie-parser';

export const handleCors = ( app: Application ) =>
	app.use( cors( { credentials: true, origin: true } ) );

export const handleBodyRequestParsing = ( app: Application ) => {
	//support application/x-www-form-urlencoded post data
	app.use( parser.urlencoded( { extended: true, limit: process.env.REQUEST_LIMIT || '100kb' } ) );
	// support application/json type post data
	app.use( parser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }) );

	app.use( cookieParser( process.env.SESSION_SECRET ) );
};
