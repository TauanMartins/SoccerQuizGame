import React, { forwardRef, useEffect, useState } from "react";
import { Label } from "reactstrap";
import api from "../../services/api";

function Question({ player, rawParameters, rawQuestions, answersF, correctAnswerF }, ref) {

    const [selectedPlayer, setSelectedPlayer] = useState()
    const [players, setPlayers] = useState([{}]);
    const [question, setQuestion] = useState();
    const [questionAbout, setQuestionAbout] = useState();
    const [correctAnswer, setCorrectAnswer] = useState();
    const [answers, setAnswers] = useState([]);
    var indexRandom = 1;


    function generateQuestion(player) {
        // se por acaso o peso do jogador for 0 (API não preencheu), será gerada outra pergunta
        if (player.weight === 0) {
            while (indexRandom === 1) {
                indexRandom = Math.floor(Math.random() * rawParameters.length)
            }
        } else {
            indexRandom = Math.floor(Math.random() * rawParameters.length)
        }
        // com base na pegunta aleatória que vier, cairá em um dos switches abaixo
        // a partir daí a sequência é: 
        // 1 -  setar sobre oq é a pergunta. Ex: weight
        // 2 - setar a pergunta de fato.
        // 3 - setar a resposta certa.
        // 4 - mandar a resposta certa para o componente pai para quando o usuário
        //     responder o programa saber se ele acertou ou n e assim somar a pontuação.
        // 5 - setar a lista de respostas.
        // 6 - mandar a lista de respostas para o componente pai para renderizar na tela.
        switch (indexRandom) {
            case 0:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.height)
                setCorrectAnswer(player.height)
                correctAnswerF(player.height)
                setAnswers([player.height, player.height-3, player.height+4, player.height+7])
                answersF([player.height, player.height-3, player.height+4, player.height+7])
                break;
            case 1:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.weight)
                setCorrectAnswer(player.weight)
                correctAnswerF(player.weight)
                setAnswers([player.weight+6, player.weight+2, player.weight, player.weight-4])
                answersF([player.weight+6, player.weight+2, player.weight, player.weight-4])
                break;
            case 2:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.birthDate)
                setCorrectAnswer(player.birthDate)
                correctAnswerF(player.birthDate)
                setAnswers(['2000-01-5', '1998-04-30', '1992-07-28', player.birthDate])
                answersF(['2000-01-5', '1998-04-30', '1992-07-28', player.birthDate])
                break;
            case 3:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.age)
                setCorrectAnswer(player.age)
                correctAnswerF(player.age)
                setAnswers([player.age+2, player.age, player.age-3, player.age+1])
                answersF([30, player.age, 28, 23])
                break;
            case 4:
                let nation;
                async function getNameCountries() {
                    const response = await api.get(`api/nations/${player.nation}`).then(value => {
                        const json = value.data;
                        nation = json.nation.name;
                        correctAnswerF(nation)
                        return answersF(['México', 'Russia', nation, 'Malta'])
                    })
                    return response;
                }
                getNameCountries()
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.nation)
                setCorrectAnswer(player.nation)
                setAnswers(['México', 'Russia', nation, 'Malta'])
                break;
            case 5:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.foot)
                setCorrectAnswer(player.foot)
                correctAnswerF(player.foot)
                let answer = player.foot;
                let answerOposite = answer === 'Left' ? 'Right' : 'Left';
                setAnswers([player.foot, answerOposite])
                answersF([player.foot, answerOposite])
                break;
            case 6:
                setQuestionAbout(Object.keys(rawQuestions)[indexRandom])
                setQuestion(rawQuestions.position)
                setCorrectAnswer(player.position)
                correctAnswerF(player.position)
                setAnswers(['GK', player.position, 'KG', 'LG'])
                answersF(['GK', player.position, 'KG', 'LG'])
                break;
            default:
                break;
        }
    }
    ref.current = {
        setList: function (allPlayers) {
            // abaixo uma variável com todos os jogadores
            var listPlayers = allPlayers;

            // abaixo set o state player com todos os jogadores
            setPlayers(listPlayers)

            // abaixo o primeiro jogador é selecionado para a questão
            setSelectedPlayer(listPlayers[0])

            // abaixo é chamado o ref para jogar o jogador selecionado para componente pai
            player(listPlayers[0]);

            // é mostrado o jogador
            console.log(listPlayers[0])

            // gera a questão sobre o primeiro jogador especificado
            generateQuestion(listPlayers[0])

        },
        nextQuestion: function () {
            // depois da função nextQuestion ser acionada o jogador atual é deixado
            // para trás e abaixo a variável busca o jogador de índice 2 na lista geral
            var next_player = players.indexOf(selectedPlayer, 0) + 1;

            // é mostrado o novo jogador
            console.log(players[next_player])

            // é gerada uma questão sobre esse jogador
            generateQuestion(players[next_player])

            // a variável player é atualizada para o novo jogador
            setSelectedPlayer(players[next_player])

            // é jogado para o componente pai o novo jogador
            player(players[next_player])

        },
        ...{ selectedPlayer: selectedPlayer, players: players }
    }

    useEffect(() => {
        // lixo que reclamam por n usar:
        if (questionAbout === 'lixo') {
            let lixo = (questionAbout, correctAnswer, answers)
            console.log(lixo)
        }
    }, [question])
    return (
        <Label>
            <b>{question}</b>
        </Label>
    )
}

export default forwardRef(Question)