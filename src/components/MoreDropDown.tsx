import React, { useCallback, useContext, useState } from 'react';
import { ActiveContext } from '../screens/Home/Home';


type MoreDropDownProps = {
    id : string,
    onClickFn : any,
    list : Array<{title : string, onClickFn : any}>,
}

function MoreDropDown({
    list,
    onClickFn,
    id
} : MoreDropDownProps) {

    // const [isActive, setIsActive] = useState(false);

    // const toggleIsActive = useCallback(()=>{
    //     setIsActive((prevState)=>(!prevState));
    // },[]);

    const activeDropDownId = useContext(ActiveContext);

    return (
        <div className={`dropdown ${(id === activeDropDownId)? 'active' : ''}`}>
            <button onClick={onClickFn} className="dropdown_btn">more</button>
            <div className="dropdown_content">
                <ul>
                    {list.map((menu,idx)=>(
                        <li key={idx} onClick={menu.onClickFn}><a href='#' onClick={(e)=>{e.preventDefault();}}>{menu.title}</a></li>
                    ))}
                </ul>
            </div>
        </div>)

}

export default MoreDropDown;