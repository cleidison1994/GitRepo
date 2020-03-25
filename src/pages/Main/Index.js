import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container/Container'

import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories:[],
        loading:false,
        erro:null,
    };

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if(repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }
    componentDidUpdate(_,prevState) {
        const{ repositories } = this.state;

        if(prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }

    }

    handleInputChange = (e) => {
        this.setState({
             newRepo: e.target.value,
             erro: null,
         });
    };

    handleSubmit =  async (e) => {
        e.preventDefault();
        try {

            this.setState({
                 loading: true,
                 erro: false,
            });

            const { newRepo, repositories } = this.state;

            if(newRepo === '')  alert('Preencha o campo');

            const hasRepo = repositories.find(r => r.name === newRepo);

            if(hasRepo) alert('Repositório já selecionado');

            const response = await api.get(`/repos/${newRepo}`);

            const data = {
                name: response.data.full_name
            }
            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading:false,
                erro: false,

            })

        } catch (error) {
            this.setState({ erro: true });
        }
        finally {
            this.setState({loading:false });
        }
    };

    render() {
        const { newRepo, loading, repositories, erro } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit} error={erro}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton loading={loading}>
                        {loading ?
                        <FaSpinner color="#fff" size={14}/>
                        :
                         <FaPlus color="#fff" size={14} />
                        }
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository =>(
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
