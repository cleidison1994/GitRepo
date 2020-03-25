import React, { Component } from 'react';
import Proptype from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container/Container'
 import { Loading, Owner, IssueList, PageButton, IssueState } from './styles';

export default class Repository extends Component {
    static Proptype = {
        match: Proptype.shape({
            params: Proptype.shape({
                repository: Proptype.string,
            })
        }).isRequired,
    }
    state= {
        repository:{},
        issues: [],
        loading: true,
        filters: [
            { state:'open',label:'Open', active:true },
            { state:'finish',label:'Finish', active:false },
            { state:'all',label:'All', active: false }

        ],
        filterindex: 0,
        page: 1
    }
    async componentDidMount() {
        const { match } = this.props;
        const { filters } = this.state;

        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues]= await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`,{
               params: {
                   state: filters.find(f => f.active).state,
                   per_page: 5,
               }
            }),
        ]);
        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        })
    }

    loaIssues = async() => {
        const { match } = this.props;
        const { filters, filterindex, page } = this.state;

        const repoName = decodeURIComponent(match.params.repository);

        const [issues]= await Promise.all([
            api.get(`/repos/${repoName}/issues`,{
               params: {
                   state: filters[filterindex].state,
                   per_page: 5,
                   page,
               }
            }),
        ]);
        this.setState({ issues: issues.data })
    }

    handleClickFilter = async filterindex => {
         await this.setState({ filterindex });
        this.loaIssues();

    }
    handlePaginate = async (action) => {
        const { page } = this.state;
        await this.setState(
            { page: action === 'back' ? page -1 : page + 1 }
        );
        this.loaIssues();
    }
    render() {
        const { repository, issues, loading, filters, filterindex, page } = this.state;

        if(loading) {
            return <Loading>Carregando...</Loading>
        }
        return <Container>
            <Owner>
                <Link to="/">Voltar aos repositórios</Link>
                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>
            <IssueList>
            <IssueState active={filterindex}>
                {filters.map((f, i) => (
                     <button key={f.label}
                     onClick={() => this.handleClickFilter(i)}
                     type="button">
                         {f.label}
                     </button>
                ))}
            </IssueState>

                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>
                        <div className="">
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map(labels => (
                                    <span key={String(labels.id)}>{labels.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssueList>
            <PageButton>
                <button
                disabled={ page < 2 }
                onClick={() => this.handlePaginate('back')}>
                    Anterior
                </button>
                    <span>Pagina {page}</span>
                <button
                onClick={() => this.handlePaginate('next')}>
                    Próximo
                </button>
            </PageButton>
        </Container>
    }
}
