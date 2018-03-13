import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
    state = {
        copied: false
    }

    startCopy = () => {
        this.setState(() => ({
            copied: !this.state.copied
        }))

        setTimeout(() => {
            this.setState(() => ({ copied: !this.state.copied }))
        }, 1000 );
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            console.log(this.props.shortUrl)
        }).on('error', () => {
            console.log('Did not work');
        })
    };

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;

        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()}).`
        }
        return <p className="item__message">{this.props.visitedCount} {visitMessage}  {visitedMessage}</p>;
    }


    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--pillbutton button--pill button--link" href={this.props.shortUrl} target="_blank">
                    Visit
                </a>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisiblity', this.props._id, !this.props.visible)
                }}>{this.props.visible ? 'hide' : 'unhide'}</button>
                <button className="button button--pill" onClick={this.startCopy} ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.copied ? 'copied' :'copy'}</button>
            </div>
        );
    };
};

LinksListItem.propTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    visitedCount: React.PropTypes.number.isRequired,
    lastVisitedAt: React.PropTypes.number
}