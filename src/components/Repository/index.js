import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonsContainer, Container, Delete, DeleteText, Description, Name, Refresh, RefreshText, Stat, StatCount, Stats } from './styles';

const Repository = ({ data, onRefresh, onDelete }) => {
  return (
    <Container>
      <Name>{data.name}</Name>
      <Description>{data.description}</Description>

      <Stats>
        <Stat>
          <Icon name="star" color="#333" size={16} />
          <StatCount>{data.stars}</StatCount>
        </Stat>
        <Stat>
          <Icon name="code-fork" color="#333" size={16} />
          <StatCount>{data.forks}</StatCount>
        </Stat>
      </Stats>
      <ButtonsContainer>
        <Refresh onPress={onRefresh}>
          <Icon size={16} color="#7159c1" name="refresh" />
          <RefreshText>ATUALIZAR</RefreshText>
        </Refresh>
        <Delete onPress={onDelete}>
          <Icon size={16} color="#7159c1" name="trash" />
          <DeleteText>DELETAR</DeleteText>
        </Delete>
      </ButtonsContainer>
    </Container>
  );
};

export default Repository;
