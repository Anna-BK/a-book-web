import React, { useCallback, useState } from 'react';


function MoreDropBox() {

    const [isActive, setIsActive] = useState(false);

    const toggleIsActive = useCallback(()=>{
        setIsActive((prevState)=>(!prevState));
    },[]);

    return (
        <div className={`dropdown ${isActive? 'active' : ''}`}>
            <button onClick={toggleIsActive} className="dropdown_btn">more</button>
            <div className="dropdown_content">
                <ul>
                    <li><a href=''>Archive</a></li>
                    <li><a href=''>Delete</a></li>
                </ul>
            </div>
        </div>)

}

export default MoreDropBox;