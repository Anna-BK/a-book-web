import React from 'react';

type GridProps = {
    title : string | React.ReactNode,
    menu? : React.ReactNode,
    children? : React.ReactNode
};

function Grid({ title, children, menu } : GridProps){


    return (
        <div className="grid_container card_box_theme">
        <div className="grid_header">
          <div className="grid_title_wrapper">
            <span>{title}</span>
          </div>
          <div className="grid_menu_wrapper">
              {menu}
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