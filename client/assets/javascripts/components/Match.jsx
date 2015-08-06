import React from 'react';

var Match = React.createClass({
    render: function() {
        return (
            <tr className="match">
                <td className=""><a href={"https://twitter.com/" + this.props.winner} target="_blank">{this.props.winner}</a></td>
                <td className=""><a href={"https://twitter.com/" + this.props.loser} target="_blank">{this.props.loser}</a></td>
            </tr>
        );
    }
});
