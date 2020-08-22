var DappMenu = React.createClass({
    requiredModules: [
        'spa/ethereumWalletProvider'
    ],
    getDefaultSubscriptions() {
        return {
            'ethereum/ping': () => this.forceUpdate(),
            'toggle/connect' : connect => this.setState({connect})
        }
    },
    getInitialState() {
        return {
            menuItems: [{
                title: "Stable Coin",
                icon: "m4"
            }, {
                title: "Liquidity Crafting",
                icon: "m2"
            }, {
                title: "Liquidity Offering",
                icon: "m5"
            }, {
                title: "Swap Bazar",
                icon: "m1"
            }, {
                title: "Grimoire",
                icon: "m0"
            }, {
                title: "Github",
                icon: "m3"
            }]
        };
    },
    renderMenuItem(menuItem, i) {
        menuItem.id = menuItem.id || ('id' + (i + 1));
        menuItem.props = menuItem.props || {};
        menuItem.props.id = menuItem.props.id || menuItem.id;
        !menuItem.props.href && (menuItem.props.onClick = menuItem.props.onClick || (() => this.emit('section/change', menuItem.sectionName || menuItem.title.split(' ').join('').firstLetterToLowerCase())));
        menuItem.props.href = menuItem.props.href || "javascript:;";
        menuItem.className = menuItem.className || ("M" + menuItem.title.split(' ').join(''));
        return (
            <li key={menuItem.id} className={menuItem.className}>
                {React.createElement('a', menuItem.props, [
                    <img src={window.resolveImageURL(menuItem.icon)} />,
                    <span>{menuItem.title}</span>
                ])}
                <span className="menuArrow"><img src={window.resolveImageURL(menuItem.arrowkey || 'mk')} /></span>
            </li>
        );
    },
    toggle(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        var type = e.currentTarget.dataset.type;
        var state = {};
        state[type] = !(this.state && this.state[type])
        this.setState(state);
    },
    render() {
        return (
            <section className="MenuAll">
                <a className="maghetto" href=""><img src="assets/img/maghetto.png"></img></a>
                <a href="javascript:;" onClick={this.toggle} data-type="menu" className="menuOpener">Menu</a>
                {!window.walletAddress && <a href="javascript:;" onClick={this.toggle} data-type="connect" className="connectOpener"><img src="assets/img/m6.png"></img><span>Connect</span></a>}
                <section className="MenuOpen" style={{"display" : this.props.show ? "inline-block" : this.state && this.state.menu ? "inline-block" : "none"}}>
                    <section className="coverMenu">
                        {this.state.menuItems.map(this.renderMenuItem)}
                    </section>
                </section>
                {!window.walletAddress && this.state && this.state.connect && <section className="coverConnectMenu">
                    <EthereumWalletProvider />
                </section>}
            </section>
        );
    }
});