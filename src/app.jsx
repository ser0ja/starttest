import cn from 'classnames';
import st from './index.scss'; // https://github.com/rtsao/csjs/wiki/How-to-apply-multiple-cn-to-an-element
import React from 'react';
import ReactDOM from 'react-dom';

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
    this.listkey = props.listkey;
    this.ToListClass = new ToList();
    this.readonly = 'readOnly';
    this.tonumarr = localStorage.getObj('tonum');
    this.totextarr = localStorage.getObj('totext');
    this.todescarr = localStorage.getObj('todesc');
    console.log(this.totextarr[this.listkey]);
    this.totext = this.totextarr[this.listkey]?this.totextarr[this.listkey]:'';
    this.todesc = this.todescarr[this.listkey]?this.todescarr[this.listkey]:'';
    this.state = {ro: true, toeh: false, tosh: true};
    this.toremclick = this.toremclick.bind(this);
    this.toeditclick = this.toeditclick.bind(this);
    this.tosaveclick = this.tosaveclick.bind(this);
    this.totextref = "totext" + this.listkey;
    this.todescref = "todesc" + this.listkey;

  }
  toeditclick() {
    this.setState({ro: false, toeh: true, tosh: false});
  }
  tosaveclick() {
    this.totextarr[this.listkey] = ReactDOM.findDOMNode(this.refs[this.totextref]).value;
    this.todescarr[this.listkey] = ReactDOM.findDOMNode(this.refs[this.todescref]).value;
    localStorage.setObj('totext', this.totextarr);
    localStorage.setObj('todesc', this.todescarr);
    this.setState({ro: true, toeh: false, tosh: true});
  }
  toremclick() {
    this.tonumarr.splice(this.listkey, 1);
    this.tonumarr.forEach(function(el, i, arr){arr[i] = i});
    this.ToListClass.datareload();
    localStorage.setObj('tonum', this.tonumarr);
  }
  render() {
    return (
      <li className={st.li}>
          <div className={st.arro}>
              <input type="checkbox" className={cn({[st.leri]: true, [st.docheck]: true})}/>
              <textarea ref={this.totextref} placeholder="Заголовок" className={cn({[st.leri]: true, [st.totext]: true})} rows="1" readOnly={this.state.ro?this.readonly:null} defaultValue={this.totext?this.totext:this.listkey}></textarea>
              <a href="#" className={cn({[st.leri]: true, [st.torem]: true})} onClick={this.toremclick}>Удалить</a>
              <a href="#" className={cn({[st.leri]: true, [st.toedit]: true, [st.hidden]: this.state.toeh?true:false})} onClick={this.toeditclick}>Редактировать</a>
              <a href="#" className={cn({[st.leri]: true, [st.tosave]: true, [st.hidden]: this.state.tosh?true:false})} onClick={this.tosaveclick}>Сохранить</a>
          </div>
          <div className={st.arro}>
              <textarea ref={this.todescref} placeholder="Описание" className={cn({[st.leri]: true, [st.todesc]: true})} rows="2" readOnly={this.state.ro?this.readonly:null} defaultValue={this.todesc}></textarea>
          </div>
      </li>
    );
  }
}

class ToList extends React.Component {
  constructor(props) {
    super(props);
    this.tonumarr = localStorage.getObj('tonum');
    this.state = {add: true};
    this.datareload();
    this.toaddclick = this.toaddclick.bind(this);
    this.datareload = this.datareload.bind(this);
    this.addsetstage = this.addsetstage.bind(this);
  }
  datareload(){
    this.listitems = this.tonumarr.map((number) => <ToListItem key={number.toString()} listkey={number}/>);
  }
  toaddclick() {
    this.tonumarr.unshift(0);
    this.tonumarr.forEach(function(el, i, arr){arr[i] = i});
    localStorage.setObj('tonum', this.tonumarr);
    this.datareload();
    this.setState({add: true});
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
