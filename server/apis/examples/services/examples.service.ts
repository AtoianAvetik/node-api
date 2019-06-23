import Promise from 'bluebird';
import L from '../../../common/logger';
import Server from '../../../../server';

interface Example {
    id: number,
    name: string
}

export class ExamplesService {
    all(): Promise<Example[]> {
        return new Promise((resolve, reject ) => {
            Server.mysqlConnections['examples'].query('SELECT * FROM `examples` WHERE 1', function (error, results, fields) {
                if (error) throw error;
                L.info(results, 'fetch all examples from db');

                resolve(results);
            });
        });
    }

    byId(id: number): Promise<Example> {
        L.info(`fetch example with id ${id}`);
        return this.all().then(r => r[id])
    }

    create(example: Example): Promise<Example> {
        return new Promise((resolve, reject ) => {
            Server.mysqlConnections['examples'].query('INSERT INTO examples SET ?', example, function (error, results, fields) {
                if (error) throw error;
                L.info(`create example with name ${example.name}`);

                resolve(results);
            });
        });
    }
}

export default new ExamplesService();
