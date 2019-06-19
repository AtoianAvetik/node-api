import { Request, Response } from 'express';
import HerasService from '../services/heras.service';

export class Controller {
	all( req: Request, res: Response ): void {
		HerasService.all().then( r => res.json( r ) );
	}

	byId( req: Request, res: Response ): void {
		HerasService.byId( req.params.id ).then( r => {
			if ( r ) res.json( r );
			else res.status( 404 ).end();
		} );
	}

	create( req: Request, res: Response ): void {
		HerasService.create( req.body.name ).then( r =>
			res
				.status( 201 )
				.location( `/api/v1/examples/${r.id}` )
				.json( r ),
		);
	}
}

export default new Controller();
