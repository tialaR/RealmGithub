import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Repository from '../../components/Repository';
import api from '../../services/api';
import getRealm from '../../services/reaml';
import { Container, Form, Input, List, Submit, Title } from './styles';

const Main = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    //Buscando repositórios salvos no realm
    async function loadRepositories() {
      const realm = await getRealm();

      //Caminho onde o realm está salvando o banco
      //console.log(realm.path);

      //Realizando query no banco e ordenando  (filtrando) de forma decrescente
      //Quem tiver + stars fica em cima
      const data = realm.objects('Repository').sorted('stars', true);

      setRepositories(data);
    }

    loadRepositories();
  }, []);

  //Realm:
  async function saveRepository(repository) {
    //Escolhendo o que será salvo(de acordo com o schema Repository):
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    //Conexão com o Realm:
    const realm = await getRealm();

    //Salvando no Realm:
    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });

    return data;
  }

  //Deletando do Realm:
  async function handleDeleteRepository(repository) {
    const realm = await getRealm();

    realm.write(() => {
      let repositoryID = repository.id;
      realm.delete('Repository', repositoryID);
    });
  }

  async function handleAddRepository() {
    try {
      const response = await api.get(`/repos/${input}`);
      saveRepository(response.data);
      setInput('');
      setError(false);
      Keyboard.dismiss();
    } catch (err) {
      setError(true);
    }
  }

  //Atualizando dados do Reaml
  async function handleRefreshRepository(repository) {
    //Buscando o repositório na api para ser atualizado no app:
    const response = await api.get(`/repos/${repository.fullName}`);

    //Atualizando repositório no Realm:
    const data = await saveRepository(response.data);

    //Atualizando (sobrepondo) estado da aplicação:
    setRepositories(
      repositories.map((repo) => (repo.id === data.id ? data : repo)),
    );
  }

  return (
    <Container>
      <Title>Repositórios</Title>

      <Form>
        <Input
          value={input}
          error={error}
          onChangeText={(text) => setInput(text)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar repositório..."
        />
        <Submit onPress={handleAddRepository}>
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps="handled"
        data={repositories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Repository
            data={item}
            onRefresh={() => handleRefreshRepository(item)}
            onDelete={() => handleDeleteRepository(item)}
          />
        )}
      />
    </Container>
  );
};

export default Main;
