//Criando Conexão com o banco de dados
import Realm from 'realm';
import RepositorySchema from '../schema/RepositorySchema';

export default function getRealm() {
  return Realm.open({
    schema: [RepositorySchema],
  });
}
