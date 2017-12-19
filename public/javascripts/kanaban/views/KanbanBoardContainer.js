import React, { Component } from  'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';

// 로컬 서버에는 권한 부여 헤더가 필요 없음
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        };
    }

    addTask(cardId, taskName) {
        let prevState = this.state, // 변경하기 전 원래 상태에 대한 참조를 저장한다
            cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        // 지정된 이름과 임시 IDfh tofhdns xotmzmfmf todtjdgksek.
        let newTask = {
            id: Date.now(),
            name: taskName,
            done: false
        };

        let newState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $push: [newTask] }
            }
        });

        this.setState({ cards:nextState });

        fetch('${API_URL}/cards/${cardId}/tasks', {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                // 서버 응답이 정상이 아닌 경우
                // 오류를 생성해 UI에 대한 낙관적인 변경을 되돌린다
                throw new Error("Server response wasn't OK");
            }
        }).then((responseData) => {
            newTask.id = responseData.id;
            this.setState({ cards: nextState });
        }).catch((error) => {
            this.setState(prevState);
        });
    }

    deleteTask(cardId, taskId, taskIndex) {
        // 카드 인덱스를 찾는다
        // findIndex 함수의 경우 새롭게 추가된 array.prototype 함수이다.
        // (array.prototype.findIndex, array.prototype.find 함수가 새롭게 추가되었다)
        // 지원하지않는 브라우저에서 이를 동작하게 하기 위해서는 babel-polyfill을 설치해야한다
        // npm install --save babel-polyfilㅣ (코드에 import 'babel-polyfill'을 추가한다)

        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        // 해당 테스크를 제외한 새로운 객체를 생성한다
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                task: { $splice: [[taskIndex, 1]] }
            }
        });

        // 변경된 객체로 컴포넌트 상태를 설정한다
        this.setState({ cards: nextState });

        // API를 호출해 서버에서 해당 태스크를 제거한다
        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
            method: 'delete',
            headers: API_HEADERS
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn't OK");
            }
        }).catch((error) => {
            console.error("fetch error:", error);
            this.setState(prevState);
        });
    }

    toggleTask(cardId, taskId, taskIndex) {

        let prevState = this.state,
            cardIndex = this.state.cards.findIndex((card) => card.id == cardId), // 카드의 인덱스를 찾는다
            nowDoneValue, // 테스트의 'done'값에 대한 참조를 저장한다
            nextState = update(this.state.cards, { // $apply 명령을 이용해 done 값을 현재와 반대로 변경한다
                [cardIndex]: {
                    tasks: {
                        [taskIndex]: {
                            done: {
                                $apply: done => {
                                    newDoneValue = !done;
                                    return newDoneValue;
                                }
                            }
                        }
                    }
                }
            });

        // 변경된 객체로 컴포넌트 상태를 설정한다
        this.setState({ cards: nextState });

        // API를 호출해 서버에서 해당 태스크를 토글한다
        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({ done: newDoneValue })
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Server response wasn't OK");
            }
        }).catch((error) => {
            console.error("Fetch error:", error);
            this.setState(prevState);
        });
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers:API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData})
            })
            .catch((error) => {
                console.log('Error fetching and paring data', error);
            });
    }

    render() {
        // 새로운 함수를 전달할 때마다 속성을 생성하는 대신 입력할 코드의 양을 줄이는 방법으로 추가된 함수들을
        // 참조하는 단일 객체(taskCallbacks)를 생성하고 이를 단일 속성으로서 전달하는 방법이 있다.
        // 다만 이러한 방식은 현재 계층부터 해당 함수들이 핑요한 아래 계층까지 부모로부터 taskCallbacks를 전달받고
        // 이를 자식으로 전달해야 한다.
        return <KanbanBoard cards={this.state.cards}
            taskCallbacks={{
                toggle: this.toggleTask.bind(this),
                delete: this.deleteTask.bind(this),
                add: this.addTask.bind(this)
            }}/>
    }
}

export default KanbanBoardContainer;
