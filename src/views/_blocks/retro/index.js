import React  from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import './styles.scss';


export default class Retro extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        parent: PropTypes.node.isRequired,
    };
    componentDidMount() {
        this.retro();
        window.requestAnimationFrame(this.draw);
        window.addEventListener('mousedown', this.handleDocumentClick, false);
        window.addEventListener('touchstart', this.handleDocumentClick, false);
    }
    componentWillUnmount() {
        window.cancelAnimationFrame(this.draw);
        window.removeEventListener('mousedown', this.handleDocumentClick, false);
        window.removeEventListener('touchstart', this.handleDocumentClick, false);
    }
    retro = () => {
        const $canvas = this.$canvas;
        const $context = $canvas.getContext('2d');
        const width = $canvas.width = window.innerWidth;
        const height = $canvas.height = window.innerHeight;

        const tile = (function() {
            tile.prototype.rects = null;
            tile.prototype.divved = false;

            function tile(x, y, w, h) {
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            }

            tile.prototype.div = function() {
                this.t = this.w > this.h
                    ? [ new tile(this.x, this.y, this.w / 2, this.h), new tile(this.x + this.w / 2, this.y, this.w / 2, this.h) ]
                    : [ new tile(this.x, this.y, this.w, this.h / 2), new tile(this.x, this.y + this.h / 2, this.w, this.h / 2) ];
                return this.divved = true;
            };
            return tile;
        })();

        this.draw = () => {
            const width = $canvas.width = window.innerWidth;
            const height = $canvas.height = window.innerHeight;
            let t = new tile(0, 0, width, height);
            const tiles = [t];
            for(let k = 32; k; k--) {
                const j = Math.random() * tiles.length | 0;
                t = tiles[j];
                t.div();
                tiles.splice(j, 1, t.t[0], t.t[1]);
            }
            const lay = [];
            for (let l in tiles) {
                t = tiles[l];
                $context.beginPath();
                $context.rect(t.x, t.y, t.w, t.h);
                $context.fillStyle = `hsla(${70 * Math.random() | 0}, 40%, 50%, 1)`; // 280
                $context.closePath();
                lay.push($context.fill());
            }
            return lay;
        };
        window.addEventListener('resize', () => {
            $canvas.width = window.innerWidth;
            $canvas.height = window.innerHeight;
            this.draw();
        }, false);


    };

    handleDocumentClick = (e) => {
        console.log(e.target, findDOMNode(this.props.parent));
        e.preventDefault();
        const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn));
        if (!closest(e.target, el => el === findDOMNode(this.props.parent))) return;

        this.draw();
    };

    render() {
        return (
            <canvas className="retro" ref={r => this.$canvas = r}/>
        );
    }
}
