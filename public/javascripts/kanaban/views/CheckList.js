/**
 * Created by zeichi on 2017-04-05.
 */
import React, {Component} from 'react';

class CheckList extends Component {
    render() {
        let tasks = this.props.tasks.map((task) => (
            <li key={task.id} className="checklist_task">
                <input type="checkBox" defaultChecked={task.done}/>
                {task.name}
                <a href="#" className="checklist_task_remove"/>
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist-add-task"
                       placeholder="Type then hit Enter to add a task."/>
            </div>
        );
    };
}

export default CheckList;