function Mover(rootnode, eventhandler) {
    debugger
    this.rootNode = rootnode;
    this.rootNode.addEventListener('transitionend', eventhandler)
}

export default Mover