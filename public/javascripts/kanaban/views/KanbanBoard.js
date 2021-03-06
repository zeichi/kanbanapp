/**
 * Created by zeichi on 2017-04-05.
 */
import React, {Component, PropTypes} from 'react';
import List from './List';

class KanbanBoard extends Component {
    render() {
        return (
            <div className="app">
                <List id='todo' title="To Do" taskCallbacks={this.props.taskCallbacks} cards={
                    // array.filter(function (element) {
                    //     return element > 10;
                    // });
                    // filter 함수는 전달인자 함수 내의 특정 조건을 만족하는 요소들로 배열을 재구성한다.
                    this.props.cards.filter((card) => card.status === "todo")
                }/>

                <List id='in-progress'  title="In Progress" taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card) => card.status === "in-progress")
                }/>

                <List id='done' title="Done" taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card) => card.status === "done")
                }/>
            </div>
        );
    }
}

// KanbanBoard.propTypes = {
//     cards: PropTypes.arrayOf(PropTypes.object),
//     taskCallbacks: PropTypes.object
// };

export default KanbanBoard;