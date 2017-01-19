import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import st from './index.scss'; // https://github.com/rtsao/csjs/wiki/How-to-apply-multiple-cn-to-an-element

// http://stackoverflow.com/a/10109307
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
}
Storage.prototype.getObj = function(key) {
  return this.getItem(key)&&this.getItem(key)!='undefined'?JSON.parse(this.getItem(key)):[];
}
// http://stackoverflow.com/a/27747377
function dec2hex (dec) {
  return ('0' + dec.toString(16)).substr(-2)
}
function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr).map(dec2hex).join('')
}

class ToListItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.millisec = props.millisec;
    this.readonly = 'readOnly';
    this.state = {ro: true, toeh: false, tosh: true};
  }
  localstorageload = () => {
    this.tonumarr = localStorage.getObj('tonum');
    this.totextarr = localStorage.getObj('totext');
    this.todescarr = localStorage.getObj('todesc');
  }
  localstoragesave = () => {
    localStorage.setObj('tonum', this.tonumarr);
    localStorage.setObj('totext', this.totextarr);
    localStorage.setObj('todesc', this.todescarr);
  }
  toeditclick = () => {
    this.setState({ro: false, toeh: true, tosh: false});
  }
  tosaveclick = () => {
    console.log('tosaveclick : id = %d', this.id);
    this.localstorageload();
    this.totextarr[this.id] = ReactDOM.findDOMNode(this.refs[this.totextref]).value;
    this.todescarr[this.id] = ReactDOM.findDOMNode(this.refs[this.todescref]).value;
    this.localstoragesave();
    this.setState({ro: true, toeh: false, tosh: true});
  }
  toremclick = () => {
    console.log('toremclick : id = %d', this.id);
    this.localstorageload();
    this.tonumarr.splice(this.id, 1);
    this.totextarr.splice(this.id, 1);
    this.todescarr.splice(this.id, 1);
    this.localstoragesave();
    localStorage.setObj('tonum', this.tonumarr);
  }
  render() {
    this.localstorageload();
    this.totextref = "totext" + this.id;
    this.todescref = "todesc" + this.id;
    return (
      <li className={st.li}>
          <div className={st.arro}>
              <input type="checkbox" className={cn({[st.leri]: true, [st.docheck]: true})}/>
              <textarea ref={this.totextref} placeholder="Заголовок" className={cn({[st.leri]: true, [st.totext]: true})} rows="1" readOnly={this.state.ro?this.readonly:null} defaultValue={this.totextarr[this.id]?this.totextarr[this.id]:''}></textarea>
              <a href="#" className={cn({[st.leri]: true, [st.torem]: true})} onClick={this.toremclick}>Удалить</a>
              <a href="#" className={cn({[st.leri]: true, [st.toedit]: true, [st.hidden]: this.state.toeh?true:false})} onClick={this.toeditclick}>Редактировать</a>
              <a href="#" className={cn({[st.leri]: true, [st.tosave]: true, [st.hidden]: this.state.tosh?true:false})} onClick={this.tosaveclick}>Сохранить</a>
          </div>
          <div className={st.arro}>
              <span className={cn({[st.leri]: true, [st.id]: true})}>ID:{this.id}&nbsp;Time:{this.millisec}</span>
              <textarea ref={this.todescref} placeholder="Описание" className={cn({[st.leri]: true, [st.todesc]: true})} rows="2" readOnly={this.state.ro?this.readonly:null} defaultValue={this.todescarr[this.id]?this.todescarr[this.id]:''}></textarea>
          </div>
      </li>
    );
  }
}

class ToList extends React.Component {
  constructor(props) {
    super(props);
  }
  localstorageload = () => {
    this.tonumarr = localStorage.getObj('tonum');
    this.totextarr = localStorage.getObj('totext');
    this.todescarr = localStorage.getObj('todesc');
  }
  localstoragesave = () => {
    localStorage.setObj('tonum', this.tonumarr);
    localStorage.setObj('totext', this.totextarr);
    localStorage.setObj('todesc', this.todescarr);
  }
  toaddclick = () => {
    this.localstorageload();
    console.log('toaddclick : id = %d', this.tonumarr.length);
    this.tonumarr.push(new Date().getTime());
    this.totextarr.push('');
    this.todescarr.push('');
    this.localstoragesave();
    this.forceUpdate();
  }
  render() {
    this.localstorageload();
    const listitems = this.tonumarr.map((v_, k_) => <ToListItem key={k_} id={k_} millisec={v_}/>);
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
          {listitems}
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
