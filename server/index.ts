import './common/env';
import Server from './common/server';
import { routes, docs }from './apis';
import middlewares from "./middlewares";

const port = parseInt( process.env.PORT );
export default new Server()
	.middleware( middlewares )
	.docs( docs )
	.router( routes )
	.listen( port );
