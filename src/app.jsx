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
    this.todonumarr = localStorage.getObj('todonum');
    this.todotypearr = localStorage.getObj('todotype');
    this.todotextarr = localStorage.getObj('todotext');
    this.tododescarr = localStorage.getObj('tododesc');
  }
  localstoragesave = () => {
    localStorage.setObj('todonum', this.todonumarr);
    localStorage.setObj('todotype', this.todotypearr);
    localStorage.setObj('todotext', this.todotextarr);
    localStorage.setObj('tododesc', this.tododescarr);
  }
  docheckchange = () => {
    console.log('docheckclick : id = %d', this.id);
    this.localstorageload();
    this.todotypearr[this.id] = -1;
    this.localstoragesave();
  }
  toeditclick = () => {
    console.log('toeditclick : id = %d', this.id);
    this.setState({ro: false, toeh: true, tosh: false});
  }
  tosaveclick = () => {
    console.log('tosaveclick : id = %d', this.id);
    this.localstorageload();
    this.todotextarr[this.id] = ReactDOM.findDOMNode(this.refs[this.todotextref]).value;
    this.tododescarr[this.id] = ReactDOM.findDOMNode(this.refs[this.tododescref]).value;
    this.localstoragesave();
    this.setState({ro: true, toeh: false, tosh: true});
  }
  toremclick = () => {
    console.log('toremclick : id = %d', this.id);
    this.localstorageload();
    this.todonumarr.splice(this.id, 1);
    this.todotextarr.splice(this.id, 1);
    this.tododescarr.splice(this.id, 1);
    this.localstoragesave();
    localStorage.setObj('tonum', this.todonumarr);
  }
  render() {
    this.localstorageload();
    this.todotypeindex = this.todotypearr[this.id];
    this.todotextref = "todotext" + this.id;
    this.tododescref = "tododesc" + this.id;
    return (
      this.todotypeindex==1?
      (<li className={st.li}>
          <div className={st.arro}>
            <input type="checkbox" className={cn({[st.le]: true, [st.docheck]: true})} onChange={this.docheckchange}/>
            <textarea ref={this.todotextref} placeholder="Заголовок" className={cn({[st.le]: true, [st.totext]: true})} rows="1" readOnly={this.state.ro?this.readonly:null} defaultValue={this.todotextarr[this.id]?this.todotextarr[this.id]:''}></textarea>
              <a href="#" className={cn({[st.ri]: true, [st.torem]: true})} onClick={this.toremclick}>Удалить</a>
              <a href="#" className={cn({[st.ri]: true, [st.toedit]: true, [st.hidden]: this.state.toeh?true:false})} onClick={this.toeditclick}>Редактировать</a>
              <a href="#" className={cn({[st.ri]: true, [st.tosave]: true, [st.hidden]: this.state.tosh?true:false})} onClick={this.tosaveclick}>Сохранить</a>
          </div>
          <div className={st.arro}>
              <span className={cn({[st.ri]: true, [st.id]: true})}>ID:{this.id}&nbsp;Time:{this.millisec}</span>
              <textarea ref={this.tododescref} placeholder="Описание" className={cn({[st.le]: true, [st.todesc]: true})} rows="2" readOnly={this.state.ro?this.readonly:null} defaultValue={this.tododescarr[this.id]?this.tododescarr[this.id]:''}></textarea>
          </div>
      </li>):null
    );
  }
}
class DoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.millisec = props.millisec;
  }
  localstorageload = () => {
    this.todonumarr = localStorage.getObj('todonum');
    this.todotypearr = localStorage.getObj('todotype');
    this.todotextarr = localStorage.getObj('todotext');
    this.tododescarr = localStorage.getObj('tododesc');
  }
  localstoragesave = () => {
    localStorage.setObj('todonum', this.todonumarr);
    localStorage.setObj('todotype', this.todotypearr);
    localStorage.setObj('todotext', this.todotextarr);
    localStorage.setObj('tododesc', this.tododescarr);
  }
  torestclick = () => {
    console.log('torestclick : id = %d', this.id);
    this.localstorageload();
    this.todotypearr[this.id] = 1;
    this.localstoragesave();
  }
  render() {
    this.localstorageload();
    this.todotypeindex = this.todotypearr[this.id];
    this.todotextref = "todotext" + this.id;
    return (
      this.todotypeindex==-1?
      (<li className={st.li}>
          <div className={st.arro}>
              <textarea ref={this.todotextref} placeholder="Заголовок" className={cn({[st.le]: true, [st.dotext]: true})} rows="1" readOnly="readOnly" defaultValue={this.todotextarr[this.id]?this.todotextarr[this.id]:''}></textarea>
              <a href="#" className={cn({[st.ri]: true, [st.dorest]: true})} onClick={this.torestclick}>Восстановить</a>
          </div>
          <div className={st.arro}>
            <span className={cn({[st.ri]: true, [st.id]: true})}>ID:{this.id}&nbsp;Time:{this.millisec}</span>
          </div>
      </li>):null
    );
  }
}
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }
  localstorageload = () => {
    this.todonumarr = localStorage.getObj('todonum');
    this.todotypearr = localStorage.getObj('todotype');
    this.todotextarr = localStorage.getObj('todotext');
    this.tododescarr = localStorage.getObj('tododesc');
  }
  localstoragesave = () => {
    localStorage.setObj('todonum', this.todonumarr);
    localStorage.setObj('todotype', this.todotypearr);
    localStorage.setObj('todotext', this.todotextarr);
    localStorage.setObj('tododesc', this.tododescarr);
  }
  toaddclick = () => {
    this.localstorageload();
    console.log('toaddclick : id = %d', this.todonumarr.length);
    this.todonumarr.push(new Date().getTime());
    this.todotypearr.push(1);
    this.todotextarr.push('');
    this.tododescarr.push('');
    this.localstoragesave();
    this.forceUpdate();
  }
  render() {
    this.localstorageload();
    const tolistitems = this.todonumarr.map((v_, k_) => <ToListItem key={k_} id={k_} millisec={v_}/>);
    const dolistitems = this.todonumarr.map((v_, k_) => <DoListItem key={k_} id={k_} millisec={v_}/>);
    return (
      <div className={st.maindiv}>
        <ul className={st.ul}>
          <li className={st.li}>
            <div className={cn({[st.arro]: true, [st.center]: true})}>
              <span className={cn({[st.totitl]: true})}>Актуальные задачи</span>
            </div>
          </li>
          <li className={st.li}>
            <div className={cn({[st.arro]: true, [st.arroadd]: true})}>
              <a href="#" className={cn({[st.le]: true, [st.toadd]: true})} onClick={this.toaddclick}>Добавить</a>
            </div>
          </li>
          {tolistitems}
        </ul>
        <hr/>
        <ul className={st.ul}>
          <li className={st.li}>
            <div className={cn({[st.arro]: true, [st.center]: true})}>
              <span className={cn({[st.dotitl]: true})}>Завершённые задачи</span>
            </div>
          </li>
          {dolistitems}
        </ul>
      </div>
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
                <input type="text" className="font le dotext" value={value} readOnly/>
                <a href="#" className="font a le dorest">Восстановить</a>
            </div>
            <div className="arro">
                <textarea className="font le dodesc" cols="5" value={value} readOnly></textarea>
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
        <ToDoList />
      </div>
    )
  }
}
