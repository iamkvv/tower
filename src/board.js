import './App.css'
import React, { Component } from 'react'
import DropCell from './dropCell'
import Disk from './disk'

class Board extends Component {
  constructor(props) {
    super(props);
    this.diskRefs = {};
    this.boardRef = null;
    this.DnDrefs = {};

    this.setDnDrefs = (ref_d, idx) => {
      console.log("setDnDrefs", ref_d, this.diskRefs)
      this.diskRefs = Object.assign(this.diskRefs, { [idx]: ref_d });
    }


    //   this.setDiskRefs = (el, obj) => {
    //     //чистим пустые ref'ы (образуются после уменьшения кол-ва дисков)
    //     // и передаем непустые в Parent
    //     for (const k of Object.keys(this.diskRefs)) {
    //       if (this.diskRefs[k] === null) delete this.diskRefs[k]
    //     }

    //     this.diskRefs = Object.assign({}, this.diskRefs, { [obj.idx]: el });
    //   }

    this.setBoardRef = (el) => {
      this.boardRef = el;
    }
  }

  componentDidMount() {
    this.props.getRefs(this.boardRef, this.diskRefs);
  }

  componentDidUpdate() {
    this.props.getRefs(this.boardRef, this.diskRefs);
    //debugger
  }

  render() {
    const { disks } = this.props
    let r, c = 0

    return (
      <div className="wrapper"
        style={{
          height: `${30 * disks.length}px`,
          gridTemplateRows: `repeat(${disks.length}, ${30}px`
        }}
        ref={(el) => this.setBoardRef(el)}
      >
        {
          new Array(disks.length * 3).fill(null, 0, disks.length * 3).map((d, i) => {
            if (!(i % (disks.length))) { r = 0; c++; } r++
            return (<DropCell row={r} col={c} disks={disks} />)
          })
        }



        {
          disks.map(e => (
            <Disk color={e.color}
              width={e.width}
              gridArea={`${e.rowStart}/${e.colStart}/${e.rowEnd}/${e.colEnd}`}
              disks={disks}
              idx={e.idx}
              // ref={(el, obj) => this.setDiskRefs(el, e)}
              key={e.idx}
              changePlaceOndrop={this.props.changePlaceOndrop}
              setDnDrefs={this.setDnDrefs}
            />

          ))
        }

        <div className='peg' ></div>

      </div>
    )
  }
}

export default Board
