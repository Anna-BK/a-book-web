import React, { useCallback, useState } from 'react';


type MoreDropDownProps = {
    list : Array<{title : string, onClickFn : any}>,
}

function MoreDropDown({
    list
} : MoreDropDownProps) {

    const [isActive, setIsActive] = useState(false);

    const toggleIsActive = useCallback(()=>{
        setIsActive((prevState)=>(!prevState));
    },[]);

    return (
        <div className={`dropdown ${isActive? 'active' : ''}`}>
            <button onClick={toggleIsActive} className="dropdown_btn">more</button>
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