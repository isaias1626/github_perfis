import { useEffect, useState } from "react";
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(false);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        if (!nomeUsuario) return; // Verifica se o nome do usuário está vazio

        const carregarRepositorios = async () => {
            setEstaCarregando(true); // Ativa o estado de carregamento

            try {
                const response = await fetch(`https://api.github.com/users/${nomeUsuario}/repos`);

                if (!response.ok) {
                    throw new Error('Usuário não encontrado no GitHub');
                }

                const data = await response.json();
                setRepos(data);
                setDeuErro(false);
            } catch (error) {
                console.error('Erro ao buscar repositórios:', error);
                setDeuErro(true);
            } finally {
                setTimeout(() => {
                    setEstaCarregando(false); // Desativa o estado de carregamento após 5 segundos
                }, 5000);
            }
        };

        carregarRepositorios();

    }, [nomeUsuario]);

    return (
        <div className="container">
            {deuErro ? (
                <p className={styles.deuErro}>Usuário não encontrado no GitHub.</p>
            ) : (
                <div>
                    {estaCarregando ? (
                        <h1 className={styles.carregando}><span></span></h1>
                    ) : (
                        <ul className={styles.list}>
                            {repos.map(({ id, name, language, html_url }) => (
                                <li className={styles.listItem} key={id}>
                                    <div className={styles.itemName}>
                                        <b>Nome:</b> {name} <br />
                                    </div>
                                    <div className={styles.itemLanguage}>
                                        <b>Linguagem:</b> {language} <br />
                                    </div>
                                    <a className={styles.itemLink} target="_blank" href={html_url}> Visitar no Github </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReposList;