import React from 'react';

var Player = React.createClass({
    render: function() {
        return (
            <tr className="player">
                <td><h4 className="ui header"><div className="content">{this.props.name}</div></h4></td>
                <td>{this.props.rating}</td>
                <td>{this.props.rank}</td>
            </tr>
        );
    }
});

module.exports = Player;
