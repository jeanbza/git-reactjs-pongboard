import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import ActionAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';

import aUrl from 'file!./../../images/a.jpg'
import bUrl from 'file!./../../images/b.jpg'
import cUrl from 'file!./../../images/c.jpg'
import dUrl from 'file!./../../images/d.jpg'
import eUrl from 'file!./../../images/e.jpg'
import fUrl from 'file!./../../images/f.jpg'
import gUrl from 'file!./../../images/g.jpg'
import hUrl from 'file!./../../images/h.jpg'
import iUrl from 'file!./../../images/i.jpg'
import jUrl from 'file!./../../images/j.jpg'
import kUrl from 'file!./../../images/k.jpg'
import lUrl from 'file!./../../images/l.jpg'
import mUrl from 'file!./../../images/m.jpg'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: "calc(100% - 56px)",
    overflowY: 'auto',
    paddingTop: '10px',
  },
};

const tilesData = [
  {img: `./dist/${aUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${bUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${cUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${dUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${eUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${fUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${gUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${hUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${iUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${jUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${kUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${lUrl}`, title: 'Title Goes Here', price: 3.51},
  {img: `./dist/${mUrl}`, title: 'Title Goes Here', price: 3.51},
];

const GridListExampleSimple = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={300}
      style={styles.gridList}
      cols={3}
      padding={10}
    >
      {tilesData.map((tile, i) => (
        <GridTile
          key={i}
          title={tile.title}
          subtitle={<span>$<b>{tile.price}</b></span>}
          actionIcon={
            <FlatButton
              label="Purchase"
              labelPosition="before"
              primary={true}
              style={{paddingRight: "5px"}}
              icon={<ActionAddShoppingCart />}
            />
          }
        >
          <img src={tile.img}/>
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListExampleSimple;