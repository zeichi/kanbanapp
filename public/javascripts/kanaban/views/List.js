/**
 * Created by zeichi on 2017-04-05.
 */
import React, {Component} from 'react';
import Card from './Card';

class List extends Component {
    render() {
        // array.map(function(element){
        //      return element*10}
        // );
        // map 함수는 해당 array를 function 내 특정 규칙으로 새로운 배열을 만든다.
        var cards = this.props.cards.map((card) => {
            return <Card
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                color={card.color}
                tasks={card.tasks}
            />
        });

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

export default List;