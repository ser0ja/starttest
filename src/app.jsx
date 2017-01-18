import cn from 'classnames';
import st from './index.scss'; // https://github.com/rtsao/csjs/wiki/How-to-apply-multiple-cn-to-an-element
import React from 'react';

function ToAdd(props) {}
function ToRemove(props) {}

function ToListItem(props) {
    const value = props.value;
    var isToggleOn = true;
    function handleClick(e) {
        e.preventDefault();
        isToggleOn = !isToggleOn;
    }

    return (
        <li className={st.li}>
            <div className={st.arro}>
                <input type="checkbox" className={cn({[st.leri]: true, [st.docheck]: true})}/>
                <input type="text" name={"totext:" + value} className={cn({[st.font]: true, [st.leri]: true, [st.totext]: true})} value={isToggleOn?'ON':'OFF'} readOnly/>
                <a href="#" className={cn({[st.font]: true, [st.a]: true, [st.leri]: true, [st.torem]: true})}>Удалить</a>
                <a href="#" name={"toedit:" + value} className={cn({[st.font]: true, [st.a]: true, [st.leri]: true, [st.toedit]: true})} onClick={handleClick}>Редактировать</a>
                <a href="#" className={cn({[st.font]: true, [st.a]: true, [st.leri]: true, [st.tosave]: true})}>Сохранить</a>
            </div>
            <div className={st.arro}>
                <textarea className={cn({[st.font]: true, [st.leri]: true, [st.todesc]: true})} cols="5" value={isToggleOn?'ON':'OFF'} readOnly></textarea>
            </div>
        </li>
    );
}

function ToList() {
    const tonum = [1, 2];
    const listitems = tonum.map((number) => <ToListItem key={number.toString()} value={number}/>);
    return (
        <ul className={st.ul}>
            <li className={st.li}>
                <div className={cn({[st.arro]: true, [st.center]: true})}>
                    <span className={cn({[st.font]: true, [st.span]: true, [st.totitl]: true})}>Актуальные задачи</span>
                </div>
            </li>
            <li className={st.li}>
                <div className={st.arro}>
                    <a href="#" className={cn({[st.font]: true, [st.a]: true, [st.leri]: true, [st.toadd]: true})}>Добавить</a>
                </div>
            </li>
            {listitems}
        </ul>
    );
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
          <ToList />
          <hr className="hr"/>
      </div>
    )
  }
}
