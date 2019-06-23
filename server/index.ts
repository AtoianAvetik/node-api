import './common/env';
import Server from './common/server';
import { routes, docs }from './apis';
import middlewares from "./middlewares";
import errorHandlers from "./middlewares/errorHandlers";

const port = parseInt( process.env.PORT );
export default new Server()
	.middleware( middlewares )
	.docs( docs )
	.router( routes )
	.errors( errorHandlers )
	.listen( port );
