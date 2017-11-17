/**
 * Created by zeichi on 2017-04-05.
 */
import React, {Component} from 'react';
import CheckList from './CheckList';
import marked from 'marked';

class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        };
    }

    toggleState() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        let cardDetails,
            // 리액트에서의 인라인 스타일 설정 시 객체 타입으로 속성들을 미리 설정한다.
            sideStyle = {
                position: 'absolute',
                zIndex: -1,
                top: 0,
                bottom: 0,
                left: 0,
                width: 7,
                backgroundColor: this.props.color
            };

        if (this.state.showDetails) {
            cardDetails = (
                <div className="card_details">
                    <span dangerouslySetInnerHTML={{__html: marked(this.props.description)}}/>
                    <CheckList cardId={this.props.id} tasks={this.props.tasks}/>
                </div>
            );
        }

        // <div className="card_title" onClick={() => this.toggleState()}>{this.props.title}</div>

        // <div className="card_title" onClick={() => this.setState({showDetails: !this.state.showDetails})}>{this.props.title}</div>

        return (
            // <div className="card">
            //     <div className="card_title" onClick={() => this.setState({showDetails: !this.state.showDetails})}>{this.props.title}</div>
            //     {cardDetails}
            // </div>

            // bind 함수를 통해서 이벤트 핸들러 함수에 현재 컨텍스트를 바인딩한다.
            /* 미리 설정한 인라인 스타일 객체를 style 속성으로 반영한다.*/
            <div className="card">
                <div style={sideStyle}></div>
                <div className={
                    this.state.showDetails ? "card_title card_title-is-open" : "card_title"
                } onClick={this.toggleState.bind(this)}>
                    {this.props.title}
                </div>
                {cardDetails}
            </div>
        );
    }
}

export default Card;