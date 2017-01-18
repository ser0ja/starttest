import cn from 'classnames';
import st from './index.scss'; // https://github.com/rtsao/csjs/wiki/How-to-apply-multiple-cn-to-an-element
import React from 'react';

//http://stackoverflow.com/a/10109307
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}
Storage.prototype.getObj = function(key) {
    return this.getItem(key)&&this.getItem(key)!='undefined'?JSON.parse(this.getItem(key)):[];
}

function ToAdd(props) {}
function ToRemove(props) {}

class ToListItem extends React.Component {
  constructor(props) {
    super(props);
    this.value = props.value;
    this.ToListClass = new ToList();
    this.tonum = localStorage.getObj('tonum');
    this.state = {ro: true, toeh: false, tosh: true};
    this.toremclick = this.toremclick.bind(this);
    this.toeditclick = this.toeditclick.bind(this);
    this.tosaveclick = this.tosaveclick.bind(this);
  }
  toeditclick() {
    this.setState({ro: false, toeh: true, tosh: false});
  }
  tosaveclick() {
    this.setState({ro: true, toeh: false, tosh: true});
  }
  toremclick() {
    this.tonum.splice(this.value, 1);
    this.tonum.forEach(function(el, i, arr){arr[i] = i});
    this.ToListClass.datareload();
    this.ToListClass.addsetstage = () => {this.setState({add: true})};
    localStorage.setObj('tonum', this.tonum);
  }
  render() {
    return (
      <li className={st.li} name={"toli:" + this.value}>
          <div className={st.arro}>
              <input type="checkbox" className={cn({[st.leri]: true, [st.docheck]: true})}/>
              <textarea placeholder="Заголовок" className={cn({[st.leri]: true, [st.totext]: true})} rows="1" readOnly={this.state.ro?true:false} value={this.value}></textarea>
              <a href="#" className={cn({[st.leri]: true, [st.torem]: true})} onClick={this.toremclick}>Удалить</a>
              <a href="#" className={cn({[st.leri]: true, [st.toedit]: true, [st.hidden]: this.state.toeh?true:false})} onClick={this.toeditclick}>Редактировать</a>
              <a href="#" className={cn({[st.leri]: true, [st.tosave]: true, [st.hidden]: this.state.tosh?true:false})} onClick={this.tosaveclick}>Сохранить</a>
          </div>
          <div className={st.arro}>
              <textarea placeholder="Описание" className={cn({[st.font]: true, [st.leri]: true, [st.todesc]: true})} rows="1" readOnly={this.state.ro?true:false}></textarea>
          </div>
      </li>
    );
  }
}

class ToList extends React.Component {
  datareload(){
    this.listitems = this.tonum.map((number) => <ToListItem key={number.toString()} value={number}/>);
  }
  constructor(props) {
    super(props);
    this.tonum = localStorage.getObj('tonum');
    this.state = {add: true};
    this.datareload();
    this.toaddclick = this.toaddclick.bind(this);
    this.datareload = this.datareload.bind(this);
    this.addsetstage = this.addsetstage.bind(this);
  }
  toaddclick() {
    this.tonum.unshift(0);
    this.tonum.forEach(function(el, i, arr){arr[i] = i});
    localStorage.setObj('tonum', this.tonum);
    this.datareload();
    this.addsetstage();
  }
  addsetstage(){
    this.setState({add: true});
    console.log('addsetstage');
  }
  render() {
    return (
      <ul className={st.ul}>
          <li className={st.li}>
              <div className={cn({[st.arro]: true, [st.center]: true})}>
                  <span className={cn({[st.totitl]: true})}>Актуальные задачи</span>
              </div>
          </li>
          <li className={st.li}>
              <div className={cn({[st.arro]: true, [st.arroadd]: true})}>
                  <a href="#" className={cn({[st.leri]: true, [st.toadd]: true})} onClick={this.toaddclick}>Добавить</a>
              </div>
          </li>
          {this.state.add?this.listitems:null}
      </ul>
    );
  }
}
/*
const donum = [1, 2];

function DoListItem(props) {
    const value = props.value;
    return (
        <li className="li">
            <div className="arro">
                <input type="text" className="font leri dotext" value={value} readOnly/>
                <a href="#" className="font a leri dorest">Восстановить</a>
            </div>
            <div className="arro">
                <textarea className="font leri dodesc" cols="5" value={value} readOnly></textarea>
            </div>
        </li>
    );
}

function DoList(props) {
    const numbers = props.numbers;
    const listitems = numbers.map((number) => <DoListItem key={number.toString()} value={number}/>);
    return (
        <ul className="ul">
            <li className="li">
                <div className="arro center">
                    <span className="font span dotitl">Завершённые задачи</span>
                </div>
            </li>
            {listitems}
        </ul>
    );
}
*/
export default class App extends React.Component {
  render() {
    return (
      <div>
          <div className={st.maindiv}>
            <ToList />
            <hr />
        </div>
      </div>
    )
  }
}
