import React from 'react';

type GridProps = {
    title : string | React.ReactNode,
    children?: React.ReactNode
};

function Grid({ title, children } : GridProps){


    return (
        <div className="grid_container card_box_theme">
        <div className="grid_header">
          <div className="grid_title_wrapper">
            <span>{title}</span>
          </div>
          <div className="grid_menu_wrapper">
            <div className="dropdown">
              <button onClick={() => { document.querySelector('.dropdown')?.classList.toggle('active') }} className="dropdown_btn">more</button>
              <div className="dropdown_content">
                <ul>
                  <li><a href=''>Archive</a></li>
                  <li><a href=''>Delete</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="grid">
            {children}
        </div>
        <div className="grid_footer"></div>
      </div>
    )
}

export default Grid;